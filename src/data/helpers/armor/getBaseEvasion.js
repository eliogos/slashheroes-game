import {
	DEFAULT_ELASTICITY_REFERENCE_PA,
	DEFAULT_EVASION_WEIGHTS,
	DEFAULT_ITEM_WEIGHT_KG,
	EPSILON,
} from '../constants.js';

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

// Leggings formula — effective flex rigidity (stored as an elastic-modulus-like value) and root material base weight drive evasion.
// Higher Pascals means stiffer leggings; lower Pascals means easier flex and better evasion.
export function getBaseEvasion(
	elasticityOrLeggings,
	weightOrQuality = 1,
	qualityMultiplierOrWeights = 1,
	maybeWeights = DEFAULT_EVASION_WEIGHTS
) {
	let elasticityPa;
	let weightKg;
	let qualityMultiplier;
	let weights;

	if (typeof elasticityOrLeggings === 'object' && elasticityOrLeggings !== null && 'elasticity' in elasticityOrLeggings) {
		elasticityPa = elasticityOrLeggings.elasticity?.Pascals ?? EPSILON;
		weightKg = weightOrQuality?.Kilograms ?? EPSILON;
		qualityMultiplier = qualityMultiplierOrWeights ?? 1;
		weights = maybeWeights ?? DEFAULT_EVASION_WEIGHTS;
	} else {
		elasticityPa = elasticityOrLeggings?.Pascals ?? elasticityOrLeggings ?? EPSILON;
		weightKg = weightOrQuality?.Kilograms ?? weightOrQuality ?? EPSILON;
		qualityMultiplier = qualityMultiplierOrWeights ?? 1;
		weights = maybeWeights ?? DEFAULT_EVASION_WEIGHTS;
	}

	const elasticityWeight = weights.elasticity ?? 0.60;
	const weightWeight = weights.weight ?? 0.40;

	const elasticityScore = clamp(
		DEFAULT_ELASTICITY_REFERENCE_PA / Math.max(elasticityPa, EPSILON),
		0,
		1
	);
	const weightScore = clamp(1 - (weightKg / Math.max(DEFAULT_ITEM_WEIGHT_KG, EPSILON)), 0, 1);

	const score =
		elasticityScore * elasticityWeight +
		weightScore * weightWeight;

	return clamp(score * qualityMultiplier, 0, 1);
}
