import { createStarterItem } from './starterItemFactory.js';

const STARTER_WEAPON_DEFINITIONS = [
	{ key: 'bronze_sword', name: 'Bronze Sword', item_type: 'weapon', subtype: 'sword', tier: 1, equippable: true, weight: 1800.0, material: { id: 'bronze' } },
	{ key: 'oak_staff', name: 'Oak Staff', item_type: 'weapon', subtype: 'staff', tier: 1, equippable: true, weight: 2200.0, material: { id: 'oak_wood' } },
	{ key: 'twin_daggers', name: 'Twin Daggers', item_type: 'weapon', subtype: 'dagger', tier: 1, equippable: true, weight: 1200.0, material: { id: 'iron' } },
	{ key: 'shortbow', name: 'Shortbow', item_type: 'weapon', subtype: 'bow', tier: 1, equippable: true, weight: 900.0, material: { id: 'yew_wood' } },
];

export const STARTER_WEAPONS = STARTER_WEAPON_DEFINITIONS.map((item) => createStarterItem(item));

export function getStarterWeaponByKey(itemKey) {
	return STARTER_WEAPONS.find((item) => item.key === itemKey) || null;
}

