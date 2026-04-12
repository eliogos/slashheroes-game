// ── Room types ───────────────────────────────────────────────────────────────

export type RoomType =
	| 'navigation'
	| 'puzzle'
	| 'trap'
	| 'npc'
	| 'shop'
	| 'landmark'
	| 'resource'
	| 'craft'
	| 'alchemy'
	| 'locked_room'
	| 'treasure'
	| 'inn'
	| 'statue'
	| 'boss';

// ── Outcome types ─────────────────────────────────────────────────────────────
// What actually happens when a player explores a room.

export type OutcomeType =
	| 'combat'
	| 'loot'
	| 'key'
	| 'mimic'
	| 'trap'
	| 'traveling_merchant'
	| 'nothing';

// ── Environment ───────────────────────────────────────────────────────────────

export type ElementalAffinity =
	| 'none'
	| 'fire'
	| 'water'
	| 'earth'
	| 'air'
	| 'lightning'
	| 'ice'
	| 'arcane'
	| 'necrotic'
	| 'holy'
	| 'poison';

export type Difficulty = 'trivial' | 'easy' | 'moderate' | 'hard' | 'deadly' | 'impossible';

export type Temperature = 'freezing' | 'cold' | 'cool' | 'moderate' | 'warm' | 'hot' | 'scorching';

export type LightLevel = 'pitchBlack' | 'dark' | 'dim' | 'moderate' | 'bright' | 'blinding';

export type Atmosphere = 'peaceful' | 'eerie' | 'oppressive' | 'chaotic' | 'sacred' | 'corrupted';

export type LootQuality = 'poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface DungeonRegion {
	id: string;
	name: string;
	description: string;
	elementalAffinity: ElementalAffinity;
	baseDifficulty: Difficulty;
	temperature: Temperature;
	lightLevel: LightLevel;
	atmosphere: Atmosphere;
	lootQuality: LootQuality;
	/**
	 * Multipliers applied to base room type weights for this region.
	 * 1.0 = no change, 0.5 = half as likely, 2.0 = twice as likely.
	 * Unspecified types default to 1.0.
	 */
	roomWeightModifiers: Partial<Record<RoomType, number>>;
}

// ── Season ────────────────────────────────────────────────────────────────────

export interface SeasonInfo {
	/** Zero-based season counter since the epoch (Jan 1 2024). */
	seasonNumber: number;
	/** True during the 7-day break between seasons. */
	isBreak: boolean;
	/** Day within the current 97-day cycle (0 = first day of season, 90 = first day of break). */
	dayInCycle: number;
	/** If active season: days until break starts. If break: days until next season starts. */
	daysUntilChange: number;
	/** Date the current cycle started (first day of the active season). */
	cycleStartDate: Date;
	/** Date the next season starts (after the break). */
	nextSeasonStartDate: Date;
}

// ── Generated data ────────────────────────────────────────────────────────────

export interface RoomVariant {
	name: string;
	description: string;
}

export interface RoomData {
	type: RoomType;
	name: string;
	description: string;
	/** Possible outcomes when a player explores this room. */
	possibleOutcomes: OutcomeType[];
}

export interface ChannelRoom extends RoomData {
	channelId: string;
	serverId: string;
	seasonNumber: number;
}

export interface ServerEnvironment {
	serverId: string;
	seasonNumber: number;
	region: DungeonRegion;
}
