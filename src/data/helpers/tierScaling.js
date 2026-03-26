import { pow } from 'mathjs';

// STEP 1 — Convert tier to curved multiplier
export function getTierMultiplier(tier, maxTier = 6) {
	const t = (tier - 1) / (maxTier - 1);
	const curved = pow(t, 1.4);
	return 0.6 + curved;
}

// STEP 2 — Apply multiplier to weapon qualities
export function applyTierScaling(baseQ, tier) {
	const t = getTierMultiplier(tier);

	return {
		weight: baseQ.weight * (0.9 + t * 0.2),
		speed:  baseQ.speed  * (0.8 + t * 0.4),
		edge:   baseQ.edge   * (0.7 + t * 0.6),
		reach:  baseQ.reach  * (0.85 + t * 0.3),
		curvature: baseQ.curvature
	};
}
