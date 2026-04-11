import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getBaseEvasion(agility: number, baseline = BASELINE_CORE_STAT): number {
	const safeAgility = normalizeStat(agility, baseline);
	return roundToStatPrecision(Math.min(Math.max(0.05 + ((safeAgility - baseline) * 0.015), 0.01), 0.75));
}
