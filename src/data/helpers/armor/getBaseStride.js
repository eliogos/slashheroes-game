// Boots formula — traction (0–1) drives stride (stamina cost reduction).
// Returns 0–1: 0 = no reduction, 0.5 = reduces stamina cost by 50%, 1 = maximum reduction.
// Better grip means more efficient movement — less energy wasted per step.
export function getBaseStride(traction, qualityMultiplier = 1) {
	return traction * qualityMultiplier;
}
