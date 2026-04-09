import type { ArmorTypeDefinition } from '../types.js';

export const ARMOR_TYPE = {
	HELM: 'helm',
	CHEST: 'chest',
	LEGGINGS: 'leggings',
	BOOTS: 'boots',
} as const;

export const typeConfigs: Readonly<Record<(typeof ARMOR_TYPE)[keyof typeof ARMOR_TYPE], ArmorTypeDefinition>> = {
	[ARMOR_TYPE.HELM]: {
		id: ARMOR_TYPE.HELM,
		displayName: 'Helm',
		stat: 'critInfluence',
		materialProperty: 'yieldStress',
		description: 'Protects the head and reduces the impact of critical strikes.',
	},
	[ARMOR_TYPE.CHEST]: {
		id: ARMOR_TYPE.CHEST,
		displayName: 'Chest',
		stat: 'defense',
		materialProperty: 'hardness',
		description: 'Protects the torso and directly reduces incoming damage.',
	},
	[ARMOR_TYPE.LEGGINGS]: {
		id: ARMOR_TYPE.LEGGINGS,
		displayName: 'Leggings',
		stat: 'evasion',
		materialProperty: 'elasticity',
		description: 'Supports lower-body agility and helps avoid incoming attacks.',
	},
	[ARMOR_TYPE.BOOTS]: {
		id: ARMOR_TYPE.BOOTS,
		displayName: 'Boots',
		stat: 'stride',
		materialProperty: 'tractionCoefficient',
		description: 'Improves footing and mobility efficiency while moving.',
	},
} as const;

export const armorTypeIds = Object.values(ARMOR_TYPE);
