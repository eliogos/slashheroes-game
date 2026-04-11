import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getBaseATKSpeed(agility: number, baseline = BASELINE_CORE_STAT): number {
	const safeAgility = normalizeStat(agility, baseline);
	return roundToStatPrecision(Math.min(Math.max(1 + (safeAgility - baseline) * 0.02, 0.5), 2.5));
}
