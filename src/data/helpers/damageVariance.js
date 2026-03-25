// STEP 0 — Determine the maximum variance for flat weapons
const MAX_SPREAD = 0.25; // ±25% by default

// STEP 1 — Compute min/max damage based on curvature
export function getDamageRange(baseDamage, curvature) {

	// STEP 2 — Convert curvature to precision factor (0–1)
	// - Using sin as a simple non-linear mapping
	const precision = Math.sin(curvature || 0);

	// STEP 3 — Compute spread
	// - More curvature → smaller spread
	const spread = MAX_SPREAD * (1 - precision);

	// STEP 4 — Return integer min/max
	return {
		min: Math.round(baseDamage * (1 - spread)),
		max: Math.round(baseDamage * (1 + spread))
	};
}