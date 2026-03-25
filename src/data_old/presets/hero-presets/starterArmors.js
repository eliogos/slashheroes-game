import { createStarterItem } from './starterItemFactory.js';

const STARTER_ARMOR_DEFINITIONS = [
	{ key: 'padded_tunic', name: 'Padded Tunic', item_type: 'armor', subtype: 'chest', tier: 1, equippable: true, weight: 2600.0, material: { id: 'linen' } },
	{ key: 'leather_vest', name: 'Leather Vest', item_type: 'armor', subtype: 'chest', tier: 1, equippable: true, weight: 2100.0, material: { id: 'leather' } },
	{ key: 'cloth_robe', name: 'Cloth Robe', item_type: 'armor', subtype: 'chest', tier: 1, equippable: true, weight: 1400.0, material: { id: 'cotton' } },
];

export const STARTER_ARMORS = STARTER_ARMOR_DEFINITIONS.map((item) => createStarterItem(item));

export function getStarterArmorByKey(itemKey) {
	return STARTER_ARMORS.find((item) => item.key === itemKey) || null;
}

