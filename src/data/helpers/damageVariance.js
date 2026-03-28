// STEP 0 — Determine the maximum variance for flat weapons
const MAX_SPREAD = 0.25; // ±25% by default

// STEP 1 — Compute min/max damage based on curvature
export function getDamageRange(baseDamage, curvature) {

	// STEP 2 — Convert curvature to precision factor (0–1)
	// - Clamps to 1.0 (zero spread) once curvature reaches 0.5
	const precision = Math.min(1, (curvature || 0) * 2);

	// STEP 3 — Compute spread
	// - More curvature → smaller spread
	const spread = MAX_SPREAD * (1 - precision);

	// STEP 4 — Return integer min/max
	return {
		min: Math.round(baseDamage * (1 - spread)),
		max: Math.round(baseDamage * (1 + spread))
	};
}
