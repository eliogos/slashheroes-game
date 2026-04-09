import { pow } from 'mathjs';
import type { WeaponQualitySet } from './types.js';

export function getTierMultiplier(tier: number, maxTier = 6): number {
	const t = (tier - 1) / (maxTier - 1);
	const curved = pow(t, 1.4) as number;
	return 0.6 + curved;
}

export function applyTierScaling(baseQ: WeaponQualitySet, tier: number): WeaponQualitySet {
	const t = getTierMultiplier(tier);

	return {
		weight: baseQ.weight * (0.9 + t * 0.2),
		speed: baseQ.speed * (0.8 + t * 0.4),
		edge: baseQ.edge * (0.7 + t * 0.6),
		reach: baseQ.reach * (0.85 + t * 0.3),
		curvature: baseQ.curvature * (0.5 + t),
	};
}
