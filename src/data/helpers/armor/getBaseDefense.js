// Chest formula — hardness (0–1) drives base defense.
// Returns 0–1: 0 = no damage reduction, 0.5 = reduces damage by 50%, 1 = maximum reduction.
// Harder materials resist surface penetration and sustain protection longer under wear.
export function getBaseDefense(hardness, qualityMultiplier = 1) {
	return hardness * qualityMultiplier;
}
