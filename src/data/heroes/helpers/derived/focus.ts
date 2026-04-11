import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getFocus(wisdom: number, intelligence: number, baseline = BASELINE_CORE_STAT): number {
	const safeWisdom = normalizeStat(wisdom, baseline);
	const safeIntelligence = normalizeStat(intelligence, baseline);
	const mentalDelta = (safeWisdom - baseline) + (safeIntelligence - baseline);
	return roundToStatPrecision(Math.max(25, 100 + (mentalDelta * 5)));
}
