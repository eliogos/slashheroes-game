import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getStaminaRegenIdleDelay(stamina: number, agility: number, baseline = BASELINE_CORE_STAT): number {
	const safeStamina = normalizeStat(stamina, baseline);
	const safeAgility = normalizeStat(agility, baseline);
	return roundToStatPrecision(Math.min(Math.max(2.8 - ((safeStamina - baseline) * 0.08) - ((safeAgility - baseline) * 0.05), 0.75), 4));
}

export function getStaminaRegenPerSecond(stamina: number, agility: number, baseline = BASELINE_CORE_STAT): number {
	const safeStamina = normalizeStat(stamina, baseline);
	const safeAgility = normalizeStat(agility, baseline);
	return roundToStatPrecision(Math.min(Math.max(3 + ((safeStamina - baseline) * 0.45) + ((safeAgility - baseline) * 0.2), 0.5), 20));
}
