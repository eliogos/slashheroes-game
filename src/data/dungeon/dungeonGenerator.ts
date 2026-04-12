import type {
	ChannelRoom,
	OutcomeType,
	RoomType,
	SeasonInfo,
	ServerEnvironment,
} from './__types/index.js';
import { DUNGEON_REGIONS } from './_data/regions.js';
import { BASE_ROOM_WEIGHTS, ROOM_OUTCOME_WEIGHTS, ROOM_VARIANTS } from './_data/roomConfig.js';

// ── Constants ─────────────────────────────────────────────────────────────────

/**
 * Fallback epoch used when SEASON_EPOCH env var is not set.
 * Set this to your planned launch date. Season 1 will begin on that date.
 * Override at runtime via the SEASON_EPOCH Cloudflare env var (ISO 8601 string).
 */
export const DEFAULT_SEASON_EPOCH_MS = Date.UTC(2026, 3, 12); // 2026-04-12

const SEASON_DURATION_DAYS = 90;
const BREAK_DURATION_DAYS = 7;
/** Total length of one full cycle: active season + preparation break. */
const CYCLE_DAYS = SEASON_DURATION_DAYS + BREAK_DURATION_DAYS; // 97

// ── Internal helpers ──────────────────────────────────────────────────────────

async function sha256Hex(input: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Deterministic weighted selection.
 * Uses 8 hex characters of `hexSegment` to pick from `items` using `weights`.
 * Items not present in `weights` (or weight 0) are never selected.
 */
function weightedChoiceFromHex<T extends string>(
	items: T[],
	weights: Partial<Record<T, number>>,
	hexSegment: string,
): T {
	const eligible = items.filter(k => (weights[k] ?? 0) > 0);
	const totalWeight = eligible.reduce((sum, k) => sum + (weights[k] ?? 0), 0);
	if (totalWeight === 0) return eligible[0] ?? items[0];

	const value = parseInt(hexSegment.slice(0, 8), 16) % totalWeight;

	let cumulative = 0;
	for (const key of eligible) {
		cumulative += weights[key] ?? 0;
		if (value < cumulative) return key;
	}
	return eligible[0];
}

// ── Season ────────────────────────────────────────────────────────────────────

/**
 * Returns deterministic season information for the given date.
 *
 * @param now       - The date to evaluate (defaults to now).
 * @param epochMs   - Season 1 start timestamp in ms UTC.
 *                    Pass `Date.parse(env.SEASON_EPOCH)` from the Worker to override.
 *                    Defaults to DEFAULT_SEASON_EPOCH_MS.
 */
export function getSeasonInfo(now: Date = new Date(), epochMs: number = DEFAULT_SEASON_EPOCH_MS): SeasonInfo {
	const MS_PER_DAY = 86_400_000;
	const daysSinceEpoch = Math.floor((now.getTime() - epochMs) / MS_PER_DAY);

	// Handle dates before the epoch (daysSinceEpoch may be negative)
	const cycleDay = ((daysSinceEpoch % CYCLE_DAYS) + CYCLE_DAYS) % CYCLE_DAYS;
	const seasonNumber = Math.floor((daysSinceEpoch - cycleDay) / CYCLE_DAYS);

	const isBreak = cycleDay >= SEASON_DURATION_DAYS;

	const cycleStartDay = daysSinceEpoch - cycleDay;
	const cycleStartDate = new Date(epochMs + cycleStartDay * MS_PER_DAY);
	const nextSeasonStartDate = new Date(epochMs + (cycleStartDay + CYCLE_DAYS) * MS_PER_DAY);

	const daysUntilChange = isBreak
		? CYCLE_DAYS - cycleDay // days until next season starts
		: SEASON_DURATION_DAYS - cycleDay; // days until break starts

	return {
		seasonNumber,
		isBreak,
		dayInCycle: cycleDay,
		daysUntilChange,
		cycleStartDate,
		nextSeasonStartDate,
	};
}

// ── Server environment ────────────────────────────────────────────────────────

/**
 * Returns the dungeon region assigned to a server for the current season.
 * Stable for 90 days, then resets with the new season.
 */
export async function getServerEnvironment(
	serverId: string,
	seasonInfo: SeasonInfo = getSeasonInfo(),
): Promise<ServerEnvironment> {
	const hash = await sha256Hex(`${serverId}-s${seasonInfo.seasonNumber}-env`);
	const index = parseInt(hash.slice(0, 8), 16) % DUNGEON_REGIONS.length;

	return {
		serverId,
		seasonNumber: seasonInfo.seasonNumber,
		region: DUNGEON_REGIONS[index],
	};
}

// ── Channel room ──────────────────────────────────────────────────────────────

/**
 * Returns the persistent room assigned to a Discord channel.
 * Room type is stable for the season; variant name/description is stable forever.
 *
 * The server's region modifiers are applied to the base room weights before
 * selection, so regions can skew toward traps, puzzles, treasure, etc.
 */
export async function getChannelRoom(
	channelId: string,
	serverId: string,
	seasonInfo: SeasonInfo = getSeasonInfo(),
): Promise<ChannelRoom> {
	// Two separate hashes: one for the room type (seasonal), one for the variant
	// name/description (permanent — so re-rolling doesn't rename the room).
	const [seasonHash, variantHash] = await Promise.all([
		sha256Hex(`${channelId}-${serverId}-s${seasonInfo.seasonNumber}-room`),
		sha256Hex(`${channelId}-variant`),
	]);

	// Build effective weights by applying region multipliers
	const env = await getServerEnvironment(serverId, seasonInfo);
	const modifiers = env.region.roomWeightModifiers;

	const effectiveWeights: Partial<Record<RoomType, number>> = {};
	for (const [type, baseWeight] of Object.entries(BASE_ROOM_WEIGHTS) as [RoomType, number][]) {
		const multiplier = modifiers[type] ?? 1.0;
		effectiveWeights[type] = Math.max(0, Math.round(baseWeight * multiplier));
	}

	const roomTypes = Object.keys(BASE_ROOM_WEIGHTS) as RoomType[];
	const roomType = weightedChoiceFromHex(roomTypes, effectiveWeights, seasonHash);

	// Pick a name/description variant (stable across seasons)
	const variants = ROOM_VARIANTS[roomType];
	const variantIndex = parseInt(variantHash.slice(0, 8), 16) % variants.length;
	const { name, description } = variants[variantIndex];

	const possibleOutcomes = Object.keys(ROOM_OUTCOME_WEIGHTS[roomType]) as OutcomeType[];

	return {
		channelId,
		serverId,
		seasonNumber: seasonInfo.seasonNumber,
		type: roomType,
		name,
		description,
		possibleOutcomes,
	};
}

// ── Outcome sampling ──────────────────────────────────────────────────────────

/**
 * Samples a single outcome for a player visiting a room.
 *
 * `visitSeed` must be unique per visit (e.g. `${userId}-${Date.now()}`).
 * The room type is stable but outcomes are re-rolled each visit.
 */
export async function sampleOutcome(
	channelId: string,
	serverId: string,
	visitSeed: string,
	seasonInfo: SeasonInfo = getSeasonInfo(),
): Promise<OutcomeType> {
	const room = await getChannelRoom(channelId, serverId, seasonInfo);
	const outcomeWeights = ROOM_OUTCOME_WEIGHTS[room.type];
	const hash = await sha256Hex(`${channelId}-${serverId}-${visitSeed}-outcome`);
	const outcomeTypes = Object.keys(outcomeWeights) as OutcomeType[];
	return weightedChoiceFromHex(outcomeTypes, outcomeWeights, hash);
}

// ── Outcome rates ─────────────────────────────────────────────────────────────

/**
 * Returns each possible outcome for a room type with its percentage chance,
 * rounded to one decimal place.
 * Useful for debug displays and tooltips.
 */
export function getOutcomeRates(roomType: RoomType): Array<{ outcome: OutcomeType; pct: number }> {
	const weights = ROOM_OUTCOME_WEIGHTS[roomType];
	const total = Object.values(weights).reduce<number>((sum, w) => sum + (w ?? 0), 0);
	return (Object.entries(weights) as [OutcomeType, number][]).map(([outcome, weight]) => ({
		outcome,
		pct: Math.round((weight / total) * 1000) / 10, // one decimal place
	}));
}

// ── Key holder note ───────────────────────────────────────────────────────────
//
// Keys are distributed through the outcome system — `navigation` rooms have a
// weighted `key` outcome and `resource` rooms have an even higher chance.
// The game layer (DB) is responsible for tracking whether a player has found a
// key in a given server+season. No channel enumeration is needed or possible
// for user-installed apps that are not guild members.
