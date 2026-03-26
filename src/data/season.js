const DEFAULT_SEASON_ID = 'S1';

export function getCurrentSeasonId(env) {
	return env?.CURRENT_SEASON_ID || DEFAULT_SEASON_ID;
}
