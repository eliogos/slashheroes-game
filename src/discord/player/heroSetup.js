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

	const assignments = ['hero_race_id = ?', 'hero_class_id = ?'];
	if (hasSeason) assignments.push('hero_season_id = ?');
	if (hasUpdatedAt) assignments.push('updated_at = ?');

	const bindingsBuilder = (
		raceId,
		classId,
		userId,
		env,
	) => {
		const bindings = [raceId, classId];
		if (hasSeason) bindings.push(getCurrentSeasonId(env));
		if (hasUpdatedAt) bindings.push(new Date().toISOString());
		bindings.push(userId);
		return bindings;
	};

	return {
		sql: `UPDATE players SET ${assignments.join(', ')} WHERE player_id = ?`,
		bindingsBuilder,
	};
}
