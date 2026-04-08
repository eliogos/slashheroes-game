const typeEntries = [
	{
		id: 'helm',
		displayName: 'Helm',
		stat: 'critInfluence',
		materialProperty: 'types.helmet.yieldStress',
		description: 'Signed influence on critical-hit damage. Positive values reduce crit damage, negative values amplify it.',
	},
	{
		id: 'chest',
		displayName: 'Chest',
		stat: 'defense',
		materialProperty: 'types.chest.hardness + types.chest.thickness',
		description: 'Reduces incoming damage. Driven mostly by chest hardness, with a small fixed thickness bonus.',
	},
	{
		id: 'leggings',
		displayName: 'Leggings',
		stat: 'evasion',
		materialProperty: 'types.leggings.elasticity + baseWeight',
		description: 'Influences evasion through leg rigidity/flex resistance and root material weight.',
	},
	{
		id: 'boots',
		displayName: 'Boots',
		stat: 'stride',
		materialProperty: 'types.boots.tractionCoefficient',
		description: 'Reduces stamina cost of movement. Driven by the boot sole’s coefficient of friction (traction).',
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
