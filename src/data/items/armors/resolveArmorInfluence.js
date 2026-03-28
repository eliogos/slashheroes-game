import { materialConfigs } from './materialConfigs.js';
import { typeConfigs } from './typeConfigs.js';

export function getInfluenceRange(armor) {
	const material = materialConfigs[armor.material];
	const type = typeConfigs[armor.type];

	const base = type.baseInfluence * (material.baseProtection / 100) * (armor.qualityMultipliers?.protection ?? 1);
	const spread = base * material.variance;

	return {
		base: Math.round(base * 10) / 10,
		min:  Math.round(Math.max(base - spread, type.min) * 10) / 10,
		max:  Math.round(Math.min(base + spread, type.max) * 10) / 10,
	};
}

export function applyArmorInfluence(statValue, influenceValue) {
	return statValue * (1 + influenceValue / 100);
}
