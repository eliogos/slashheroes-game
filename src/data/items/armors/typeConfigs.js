const typeEntries = [
	{
		id: 'helm',
		displayName: 'Helm',
		effect: 'critReduction',
		baseInfluence: 50,
		min: 0,
		max: 50,
		description: 'Influences damage taken from critical hits.',
	},
	{
		id: 'chest',
		displayName: 'Chest',
		effect: 'defense',
		baseInfluence: 75,
		min: 0,
		max: 75,
		description: 'Influences incoming damage.',
	},
	{
		id: 'leggings',
		displayName: 'Leggings',
		effect: 'agility',
		baseInfluence: 40,
		min: 0,
		max: 40,
		description: 'Influences agility.',
	},
	{
		id: 'boots',
		displayName: 'Boots',
		effect: 'staminaReduction',
		baseInfluence: 60,
		min: 0,
		max: 60,
		description: 'Influences stamina cost of actions.',
	},
];

export const ARMOR_TYPE = Object.freeze({
	HELM:     'helm',
	CHEST:    'chest',
	LEGGINGS: 'leggings',
	BOOTS:    'boots',
});

export const typeConfigs = Object.freeze(
	Object.fromEntries(typeEntries.map(entry => [entry.id, entry]))
);
export const armorTypeIds = Object.freeze(typeEntries.map(entry => entry.id));
