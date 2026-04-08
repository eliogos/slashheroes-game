import { DEFAULT_CRIT_PRESSURE_PA, EPSILON } from '../constants.js';

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

// Helm formula — compares incoming crit pressure against the helmet's yield threshold.
// Returns -1..1: positive values reduce crit bonus damage, negative values amplify it.
export function getCritMitigation(
	yieldStress,
	qualityMultiplier = 1,
	critPressurePa = DEFAULT_CRIT_PRESSURE_PA
) {
	const yieldStressPa = typeof yieldStress === 'number'
		? yieldStress
		: (yieldStress?.Pascals ?? EPSILON);

	const rawInfluence = 1 - (critPressurePa / Math.max(yieldStressPa, EPSILON));
	return clamp(rawInfluence * qualityMultiplier, -1, 1);
}
