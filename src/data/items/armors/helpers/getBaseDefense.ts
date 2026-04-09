import { EPSILON } from '../../../helpers/constants.js';

const CHEST_REFERENCE_HARDNESS_PA = 1e6;
const CHEST_REFERENCE_THICKNESS_MM = 10;

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

// Chest formula — mostly hardness, with a small fixed thickness contribution.
// Returns 0–1: 0 = no damage reduction, 0.5 = reduces damage by 50%, 1 = maximum reduction.
export function getBaseDefense(chest: { hardness?: { Pascals?: number }; thickness?: { Millimeters?: number } } | number, qualityMultiplier = 1): number {
	const hardnessPa = typeof chest === 'number'
		? chest
		: (chest?.hardness?.Pascals ?? EPSILON);

	const thicknessMm = typeof chest === 'number'
		? EPSILON
		: (chest?.thickness?.Millimeters ?? EPSILON);

	const hardnessContribution = (hardnessPa / Math.max(CHEST_REFERENCE_HARDNESS_PA, EPSILON)) * 0.85;
	const thicknessContribution = (thicknessMm / Math.max(CHEST_REFERENCE_THICKNESS_MM, EPSILON)) * 0.15;

	return clamp((hardnessContribution + thicknessContribution) * qualityMultiplier, 0, 1);
}
