import { BASELINE_CORE_STAT, roundToStatPrecision, normalizeStat } from './_utils.js';

export function getRFLX(intelligence: number, perception: number, hunger: number, agility: number, baseline = BASELINE_CORE_STAT): number {
	const safeInt = normalizeStat(intelligence, baseline);
	const safePer = normalizeStat(perception, baseline);
	const safeAgi = normalizeStat(agility, baseline);
	const safeHun = normalizeStat(hunger, baseline);
	const hungerPenalty = Math.max(0, (safeHun - baseline) * 0.01);
	const base = 0.03 + ((safeInt - baseline) * 0.007) + ((safePer - baseline) * 0.007) + ((safeAgi - baseline) * 0.007);
	return roundToStatPrecision(Math.min(Math.max(base - hungerPenalty, 0.005), 0.25));
}
