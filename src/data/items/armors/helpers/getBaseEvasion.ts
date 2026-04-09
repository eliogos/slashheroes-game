import {
	DEFAULT_ELASTICITY_REFERENCE_PA,
	DEFAULT_EVASION_WEIGHTS,
	DEFAULT_ITEM_WEIGHT_KG,
	EPSILON,
} from '../../../helpers/constants.js';

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

// Leggings formula — effective flex rigidity and root material base weight drive evasion.
// Higher Pascals means stiffer leggings; lower Pascals means easier flex and better evasion.
export function getBaseEvasion(
	elasticityOrLeggings: { elasticity?: { Pascals?: number }; Pascals?: number } | number,
	weightOrQuality: { Kilograms?: number } | number = 1,
	qualityMultiplierOrWeights = 1,
	maybeWeights = DEFAULT_EVASION_WEIGHTS,
): number {
	let elasticityPa: number;
	let weightKg: number;
	let qualityMultiplier: number;
	let weights: { elasticity?: number; weight?: number };

	if (typeof elasticityOrLeggings === 'object' && elasticityOrLeggings !== null && 'elasticity' in elasticityOrLeggings) {
		elasticityPa = elasticityOrLeggings.elasticity?.Pascals ?? EPSILON;
		weightKg = typeof weightOrQuality === 'number' ? weightOrQuality : (weightOrQuality?.Kilograms ?? EPSILON);
		qualityMultiplier = qualityMultiplierOrWeights ?? 1;
		weights = maybeWeights ?? DEFAULT_EVASION_WEIGHTS;
	} else {
		elasticityPa = typeof elasticityOrLeggings === 'number'
			? elasticityOrLeggings
			: (elasticityOrLeggings?.Pascals ?? EPSILON);
		weightKg = typeof weightOrQuality === 'number' ? weightOrQuality : (weightOrQuality?.Kilograms ?? EPSILON);
		qualityMultiplier = qualityMultiplierOrWeights ?? 1;
		weights = maybeWeights ?? DEFAULT_EVASION_WEIGHTS;
	}

	const elasticityWeight = weights.elasticity ?? 0.60;
	const weightWeight = weights.weight ?? 0.40;

	const elasticityScore = clamp(
		DEFAULT_ELASTICITY_REFERENCE_PA / Math.max(elasticityPa, EPSILON),
		0,
		1,
	);
	const weightScore = clamp(1 - (weightKg / Math.max(DEFAULT_ITEM_WEIGHT_KG, EPSILON)), 0, 1);

	const score = elasticityScore * elasticityWeight + weightScore * weightWeight;

	return clamp(score * qualityMultiplier, 0, 1);
}
