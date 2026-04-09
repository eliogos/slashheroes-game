const MAX_SPREAD = 0.25;

export function getDamageRange(baseDamage: number, curvature: number) {
	const precision = Math.min(1, (curvature || 0) * 2);
	const spread = MAX_SPREAD * (1 - precision);

	return {
		min: Math.round(baseDamage * (1 - spread)),
		max: Math.round(baseDamage * (1 + spread)),
	};
}
