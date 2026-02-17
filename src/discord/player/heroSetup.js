import { getCurrentSeasonId } from '../../data/presets/season.js';

let cachedPlayersColumns = null;

async function getPlayersColumns(env) {
	if (cachedPlayersColumns) return cachedPlayersColumns;

	try {
		const result = await env.DB.prepare('PRAGMA table_info(players)').all();
		cachedPlayersColumns = new Set((result.results || []).map((row) => row.name));
	} catch (error) {
		console.warn('Could not load players schema metadata:', error);
		cachedPlayersColumns = new Set();
	}

	return cachedPlayersColumns;
}

function hasColumn(columns, columnName) {
	return columns instanceof Set && columns.has(columnName);
}

export async function getPlayerHeroState(env, playerId) {
	const columns = await getPlayersColumns(env);

	const selectedColumns = ['player_id', 'hero_race_id', 'hero_class_id'];
	if (hasColumn(columns, 'hero_season_id')) {
		selectedColumns.push('hero_season_id');
	}

	const sql = `SELECT ${selectedColumns.join(', ')} FROM players WHERE player_id = ?`;
	const player = await env.DB.prepare(sql).bind(playerId).first();

	return { player, columns };
}

export function evaluateHeroSetup(player, env, columns) {
	if (!player) {
		return {
			ok: false,
			reason: 'missing_player',
			message: 'No player profile found yet. Re-authorize the app and run setup again.',
		};
	}

	if (!player.hero_race_id || !player.hero_class_id) {
		return {
			ok: false,
			reason: 'missing_hero',
			message: 'Set up your hero first before starting adventures.',
		};
	}

	if (hasColumn(columns, 'hero_season_id')) {
		const seasonId = getCurrentSeasonId(env);
		if (player.hero_season_id !== seasonId) {
			return {
				ok: false,
				reason: 'season_reset_required',
				message: `Season ${seasonId} has started. Pick your hero again for this season.`,
			};
		}
	}

	return { ok: true, reason: 'ok', message: '' };
}

export function buildHeroSaveSql(columns) {
	const hasSeason = hasColumn(columns, 'hero_season_id');
	const hasUpdatedAt = hasColumn(columns, 'updated_at');
	const hasStarterWeapon = hasColumn(columns, 'starter_weapon');
	const hasStarterArmor = hasColumn(columns, 'starter_armor');
	const hasStarterArtifact = hasColumn(columns, 'starter_artifact');
	const hasStarterRing = hasColumn(columns, 'starter_ring');
	const hasStarterCarrier = hasColumn(columns, 'starter_carrier');
	const hasStarterBag = hasColumn(columns, 'starter_bag');
	const hasStarterLongrange = hasColumn(columns, 'starter_longrange');
	const hasStarterUtility = hasColumn(columns, 'starter_utility');

	const assignments = ['hero_race_id = ?', 'hero_class_id = ?'];
	if (hasSeason) assignments.push('hero_season_id = ?');
	if (hasStarterWeapon) assignments.push('starter_weapon = ?');
	if (hasStarterArmor) assignments.push('starter_armor = ?');
	if (hasStarterArtifact) assignments.push('starter_artifact = ?');
	if (hasStarterRing) assignments.push('starter_ring = ?');
	if (hasStarterCarrier) assignments.push('starter_carrier = ?');
	if (hasStarterBag) assignments.push('starter_bag = ?');
	if (hasStarterLongrange) assignments.push('starter_longrange = ?');
	if (hasStarterUtility) assignments.push('starter_utility = ?');
	if (hasUpdatedAt) assignments.push('updated_at = ?');

	const bindingsBuilder = (
		raceId,
		classId,
		userId,
		env,
		starterWeaponKey = null,
		starterArmorKey = null,
		starterArtifactKey = null,
		starterRingKey = null,
		starterCarrierKey = null,
		starterBagKey = null,
		starterLongrangeKey = null,
		starterUtilityKey = null,
	) => {
		const bindings = [raceId, classId];
		if (hasSeason) bindings.push(getCurrentSeasonId(env));
		if (hasStarterWeapon) bindings.push(starterWeaponKey);
		if (hasStarterArmor) bindings.push(starterArmorKey);
		if (hasStarterArtifact) bindings.push(starterArtifactKey);
		if (hasStarterRing) bindings.push(starterRingKey);
		if (hasStarterCarrier) bindings.push(starterCarrierKey);
		if (hasStarterBag) bindings.push(starterBagKey);
		if (hasStarterLongrange) bindings.push(starterLongrangeKey);
		if (hasStarterUtility) bindings.push(starterUtilityKey);
		if (hasUpdatedAt) bindings.push(new Date().toISOString());
		bindings.push(userId);
		return bindings;
	};

	return {
		sql: `UPDATE players SET ${assignments.join(', ')} WHERE player_id = ?`,
		bindingsBuilder,
	};
}
