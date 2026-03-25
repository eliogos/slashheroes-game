// STEP 0 — default stat weights and base
const DEFAULT_WEIGHTS = { weight: 0.25, speed: 0.30, edge: 0.30, reach: 0.15 };
const BASE_MULTIPLIER = 100;

// STEP 1 — Compute damage from normalized qualities
export function getBaseDamage(norm, weights = DEFAULT_WEIGHTS, base = BASE_MULTIPLIER) {
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