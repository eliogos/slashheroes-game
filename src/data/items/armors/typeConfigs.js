const typeEntries = [
	{
		id: 'helm',
		displayName: 'Helm',
		stat: 'critMitigation',
		materialProperty: 'malleability',
		description: 'Reduces damage taken from critical hits. Driven by material malleability.',
	},
	{
		id: 'chest',
		displayName: 'Chest',
		stat: 'defense',
		materialProperty: 'hardness',
		description: 'Reduces incoming damage. Driven by material hardness.',
	},
	{
		id: 'leggings',
		displayName: 'Leggings',
		stat: 'evasion',
		materialProperty: 'malleability + weightFactor',
		description: 'Influences evasion. Driven by material flexibility and weight.',
	},
	{
		id: 'boots',
		displayName: 'Boots',
		stat: 'stride',
		materialProperty: 'traction',
		description: 'Reduces stamina cost of movement. Driven by material traction.',
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
