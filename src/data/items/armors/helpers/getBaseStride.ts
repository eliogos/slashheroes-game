import { DEFAULT_TRACTION_COEFFICIENT, EPSILON } from '../../../helpers/constants.js';

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

// Boots formula — traction is modeled as the coefficient of friction (μ), which is unitless.
// Higher μ means better grip and less energy wasted per step, reducing stamina cost.
export function getBaseStride(
	bootsOrTraction: { tractionCoefficient?: number; traction?: number } | number,
	qualityMultiplier = 1,
): number {
	const tractionCoefficient = typeof bootsOrTraction === 'number'
		? bootsOrTraction
		: (bootsOrTraction?.tractionCoefficient ?? bootsOrTraction?.traction ?? EPSILON);

	const normalizedTraction = tractionCoefficient / Math.max(DEFAULT_TRACTION_COEFFICIENT, EPSILON);
	return clamp(normalizedTraction * qualityMultiplier, 0, 1);
}
