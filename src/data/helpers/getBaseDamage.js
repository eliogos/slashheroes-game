import { BASE_MULTIPLIER, DEFAULT_DAMAGE_WEIGHTS } from './constants.js';

// STEP 1 — Compute damage from normalized qualities
export function getBaseDamage(norm, weights = DEFAULT_DAMAGE_WEIGHTS, base = BASE_MULTIPLIER) {
	const score =
		norm.weight * weights.weight +
		norm.speed  * weights.speed +
		norm.edge   * weights.edge +
		norm.reach  * weights.reach;

	// STEP 2 — Scale by base multiplier
	const rawDamage = score * base;

	// STEP 3 — Round to nearest integer
	return Math.round(rawDamage);
}
