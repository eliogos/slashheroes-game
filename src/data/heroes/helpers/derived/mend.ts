import type { HeroMagicEffectEnduranceProfile } from '../../types.js';
import { BASELINE_CORE_STAT, BASELINE_RESOURCE_POOL, roundToStatPrecision, normalizeStat, normalizeResource } from './_utils.js';

export function getMagicEffectEndurance(
	mana: number,
	wisdom: number,
	manaBaseline = BASELINE_RESOURCE_POOL,
	wisdomBaseline = BASELINE_CORE_STAT,
): HeroMagicEffectEnduranceProfile {
	const safeMana = normalizeResource(mana, manaBaseline);
	const safeWisdom = normalizeStat(wisdom, wisdomBaseline);
	const manaDelta = safeMana - manaBaseline;
	const wisdomDelta = safeWisdom - wisdomBaseline;

	return {
		reductionChance: roundToStatPrecision(Math.min(Math.max(0.04 + (manaDelta * 0.0015) + (wisdomDelta * 0.008), 0.02), 0.75)),
		nullifyChance: roundToStatPrecision(Math.min(Math.max(0.01 + (manaDelta * 0.0004) + (wisdomDelta * 0.003), 0), 0.35)),
		appliesTo: 'positive-or-negative',
	};
}
