import { BASE_MULTIPLIER, DEFAULT_DAMAGE_WEIGHTS } from '../../../helpers/constants.js';
import type { WeaponDamageProfile, WeaponQualitySet } from './types.js';

export function getBaseDamage(
	norm: Pick<WeaponQualitySet, 'weight' | 'speed' | 'edge' | 'reach'>,
	weights: WeaponDamageProfile = DEFAULT_DAMAGE_WEIGHTS,
	base = BASE_MULTIPLIER,
): number {
	const score =
		norm.weight * (weights.weight ?? DEFAULT_DAMAGE_WEIGHTS.weight) +
		norm.speed * (weights.speed ?? DEFAULT_DAMAGE_WEIGHTS.speed) +
		norm.edge * (weights.edge ?? DEFAULT_DAMAGE_WEIGHTS.edge) +
		norm.reach * (weights.reach ?? DEFAULT_DAMAGE_WEIGHTS.reach);

	return Math.round(score * base);
}
