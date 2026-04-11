import { BASELINE_CORE_STAT, BASELINE_RESOURCE_POOL, roundToStatPrecision, normalizeStat, normalizeResource } from './_utils.js';

export function getManaRegenPerAction(
	wisdom: number,
	intelligence: number,
	mana: number = BASELINE_RESOURCE_POOL,
	baseline = BASELINE_CORE_STAT,
): number {
	const safeWisdom = normalizeStat(wisdom, baseline);
	const safeIntelligence = normalizeStat(intelligence, baseline);
	const safeMana = normalizeResource(mana);
	return roundToStatPrecision(Math.min(Math.max(
		0.35
			+ ((safeWisdom - baseline) * 0.08)
			+ ((safeIntelligence - baseline) * 0.06)
			+ ((safeMana - BASELINE_RESOURCE_POOL) * 0.002),
		0.05),
		10,
	));
}

export function getManaRegenByActions(
	wisdom: number,
	intelligence: number,
	actionsTaken: number,
	mana: number = BASELINE_RESOURCE_POOL,
	baseline = BASELINE_CORE_STAT,
): number {
	const safeActions = Number.isFinite(actionsTaken) ? Math.max(0, actionsTaken) : 0;
	return roundToStatPrecision(getManaRegenPerAction(wisdom, intelligence, mana, baseline) * safeActions);
}
