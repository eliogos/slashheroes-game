import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getCritChance(perception: number, luck: number, baseline = BASELINE_CORE_STAT): number {
	const safePerception = normalizeStat(perception, baseline);
	const safeLuck = normalizeStat(luck, baseline);
	return roundToStatPrecision(Math.min(Math.max(0.05 + ((safePerception - baseline) * 0.01) + ((safeLuck - baseline) * 0.005), 0.01), 0.6));
}
