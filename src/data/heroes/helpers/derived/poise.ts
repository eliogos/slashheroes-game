import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getPoise(strength: number, stamina: number, baseline = BASELINE_CORE_STAT): number {
	const safeStrength = normalizeStat(strength, baseline);
	const safeStamina = normalizeStat(stamina, baseline);
	return roundToStatPrecision(Math.min(Math.max(50 + ((safeStrength - baseline) * 4) + ((safeStamina - baseline) * 6), 10), 250));
}
