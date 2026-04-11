import type { HeroPhysicalDamageRange } from '../../types.js';
import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getPhysicalDmg(strength: number, baseline = BASELINE_CORE_STAT): HeroPhysicalDamageRange {
	const safeStrength = normalizeStat(strength, baseline);
	const bonusStrength = Math.max(0, safeStrength - baseline);
	const min = Math.floor(bonusStrength / 2);
	const max = Math.max(min, Math.floor(bonusStrength));

	return {
		min,
		max,
		average: roundToStatPrecision((min + max) / 2),
	};
}
