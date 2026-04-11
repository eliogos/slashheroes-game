import type { HeroWeightCapacityProfile } from '../../types.js';
import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getWeightCap(strength: number, baseline = BASELINE_CORE_STAT): HeroWeightCapacityProfile {
	const safeStrength = normalizeStat(strength, baseline);
	const delta = safeStrength - baseline;

	return {
		safe: roundToStatPrecision(Math.max(10, 30 + (delta * 3))),
		max: roundToStatPrecision(Math.max(15, 45 + (delta * 4))),
		agilityPenaltyPerKg: 0.015,
		physicalDamagePenaltyPerKg: 0.02,
	};
}
