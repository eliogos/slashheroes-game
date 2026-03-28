const typeEntries = [
	{
		id: 'helm',
		displayName: 'Helm',
		effect: 'critReduction',
		description: 'Reduces damage taken from critical hits.',
	},
	{
		id: 'chest',
		displayName: 'Chest',
		effect: 'defense',
		description: 'Reduces incoming damage.',
	},
	{
		id: 'leggings',
		displayName: 'Leggings',
		effect: 'agility',
		description: 'Increases agility.',
	},
	{
		id: 'boots',
		displayName: 'Boots',
		effect: 'staminaReduction',
		description: 'Reduces stamina cost of actions.',
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
