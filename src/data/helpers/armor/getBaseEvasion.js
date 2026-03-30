import { DEFAULT_EVASION_WEIGHTS } from '../constants.js';

// Leggings formula — malleability and weightFactor drive evasion.
// Returns 0–1: 0 = no evasion bonus, 1 = maximum evasion.
// Flexible material conforms to movement; lighter material reduces drag.
export function getBaseEvasion(
	malleability,
	weightFactor,
	qualityMultiplier = 1,
	weights = DEFAULT_EVASION_WEIGHTS
) {
	const score =
		malleability       * weights.malleability +
		(1 - weightFactor) * weights.weight;

	return score * qualityMultiplier;
}
