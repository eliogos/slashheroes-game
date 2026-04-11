import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getAccuracy(perception: number, baseline = BASELINE_CORE_STAT): number {
	const safePerception = normalizeStat(perception, baseline);
	return roundToStatPrecision(Math.min(Math.max(0.5 + ((safePerception - baseline) * 0.03), 0.25), 0.95));
}
