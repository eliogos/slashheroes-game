import { materialConfigs } from '../materialConfigs.js';
import { typeConfigs } from '../__types/index.js';
import type { ArmorDefinition, ArmorStatRange } from '../types.js';
import { getBaseDefense } from './getBaseDefense.js';
import { getBaseEvasion } from './getBaseEvasion.js';
import { getBaseStride } from './getBaseStride.js';
import { getCritMitigation } from './getCritMitigation.js';

function round(value: number): number {
	return Math.round(value * 100) / 100;
}

export function resolveArmorStat(armor: ArmorDefinition): ArmorStatRange {
	const material = materialConfigs[armor.material];
	const typeConfig = typeConfigs[armor.type];
	const qualityMultiplier = armor.qualityMultipliers.protection;

	const base = round({
		critInfluence: getCritMitigation(material.types.helm, qualityMultiplier),
		defense: getBaseDefense(material.types.chest, qualityMultiplier),
		evasion: getBaseEvasion(material.types.leggings, material.baseWeight, qualityMultiplier),
		stride: getBaseStride(material.types.boots, qualityMultiplier),
	}[typeConfig.stat]);
	const spread = round(Math.abs(base) * material.variance);

	return {
		stat: typeConfig.stat,
		base,
		spread,
		min: round(base - spread),
		max: round(base + spread),
	};
}

export function applyArmorInfluence(statValue: number, influenceValue: number): number {
	return statValue * (1 + influenceValue);
}
