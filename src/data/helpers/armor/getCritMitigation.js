// Helm formula — malleability (0–1) drives crit damage mitigation.
// Returns 0–1: 0 = no resistance, 0.5 = reduces crit damage by 50%, 1 = fully absorbs.
// Malleable materials absorb and distribute the force of a critical hit.
// Rigid/brittle materials concentrate it, offering little crit cushioning.
export function getCritMitigation(malleability, qualityMultiplier = 1) {
	return malleability * qualityMultiplier;
}
