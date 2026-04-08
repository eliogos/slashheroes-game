import { DEFAULT_TRACTION_COEFFICIENT, EPSILON } from '../constants.js';

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

// Boots formula — traction is modeled as the coefficient of friction (μ), which is unitless.
// Higher μ means better grip and less energy wasted per step, reducing stamina cost.
export function getBaseStride(bootsOrTraction, qualityMultiplier = 1) {
	const tractionCoefficient = typeof bootsOrTraction === 'number'
		? bootsOrTraction
		: (bootsOrTraction?.tractionCoefficient ?? bootsOrTraction?.traction ?? EPSILON);

	const normalizedTraction = tractionCoefficient / Math.max(DEFAULT_TRACTION_COEFFICIENT, EPSILON);
	return clamp(normalizedTraction * qualityMultiplier, 0, 1);
}
