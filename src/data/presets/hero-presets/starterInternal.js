import { createStarterItem } from './starterItemFactory.js';

const STARTER_INTERNAL_DEFINITIONS = [
	{ key: 'shark_tooth_necklace', name: 'Shark Tooth Necklace', item_type: 'artifact', subtype: 'necklace', item_role: 'chaotic', tier: 1, equippable: true, durability: null, weight: 180.0, material: { id: 'bone' } },
	{
		key: 'ring_of_satiety',
		name: 'Ring of Satiety',
		item_type: 'ring',
		subtype: 'hunger',
		item_role: 'modifier',
		tier: 1,
		equippable: true,
		durability: null,
		weight: 18.0,
		material: { id: 'copper' },
		mods: { hun_decay_pct: -10 },
	},
	{
		key: 'utility_satchel',
		name: 'Utility Satchel',
		item_type: 'carriers',
		subtype: 'utility_container',
		tier: 1,
		equippable: true,
		durability: null,
		weight: 450.0,
		material: { id: 'leather' },
	},
	{
		key: 'basic_backpack',
		name: 'Basic Backpack',
		item_type: 'bag',
		subtype: 'general_bag',
		tier: 1,
		equippable: true,
		durability: null,
		weight: 650.0,
		max_weight: 9000.0,
		allowed_item_types: ['weapon', 'armor', 'artifact', 'ring', 'longrange', 'utility', 'carriers'],
		material: { id: 'canvas' },
	},
	{
		key: 'basic_satchel',
		name: 'Basic Satchel',
		item_type: 'bag',
		subtype: 'general_bag',
		tier: 1,
		equippable: true,
		durability: null,
		weight: 380.0,
		max_weight: 5500.0,
		allowed_item_types: ['weapon', 'armor', 'artifact', 'ring', 'longrange', 'utility', 'carriers'],
		material: { id: 'linen' },
	},
	{ key: 'throwing_stone', name: 'Throwing Stone', item_type: 'longrange', subtype: 'thrown', tier: 1, equippable: true, consumable: true, stackable: true, max_stack: 20, durability: null, weight: 120.0, material: { id: 'granite' } },
	{ key: 'small_health_potion', name: 'Small Health Potion', item_type: 'utility', subtype: 'potion', tier: 1, consumable: true, stackable: true, max_stack: 20, effects: [{ id: 'heal_flat', value: 25 }], durability: null, weight: 250.0, material: { id: 'glass' } },
	{ key: 'mysterious_scroll', name: 'Mysterious Scroll', item_type: 'utility', subtype: 'scroll', tier: 1, consumable: true, stackable: true, max_stack: 10, effects: [{ id: 'cast_random_spell', value: 1 }], durability: null, weight: 40.0, material: { id: 'paper' } },
	{ key: 'bread', name: 'Bread', item_type: 'utility', subtype: 'food', tier: 1, consumable: true, stackable: true, max_stack: 20, effects: [{ id: 'hunger_restore_flat', value: 12 }], durability: null, weight: 180.0, material: { id: 'organic' } },
];

export const STARTER_INTERNAL_ITEMS = STARTER_INTERNAL_DEFINITIONS.map((item) => createStarterItem(item));
export const STARTER_ARTIFACTS = STARTER_INTERNAL_ITEMS.filter((item) => item.item_type === 'artifact');
export const STARTER_RINGS = STARTER_INTERNAL_ITEMS.filter((item) => item.item_type === 'ring');
export const STARTER_CARRIERS = STARTER_INTERNAL_ITEMS.filter((item) => item.item_type === 'carriers');
export const STARTER_BAGS = STARTER_INTERNAL_ITEMS.filter((item) => item.item_type === 'bag');
export const STARTER_LONGRANGE = STARTER_INTERNAL_ITEMS.filter((item) => item.item_type === 'longrange');
export const STARTER_UTILITY = STARTER_INTERNAL_ITEMS.filter((item) => item.item_type === 'utility');

export function getStarterArtifactByKey(itemKey) {
	return STARTER_ARTIFACTS.find((item) => item.key === itemKey) || null;
}

export function getStarterRingByKey(itemKey) {
	return STARTER_RINGS.find((item) => item.key === itemKey) || null;
}

export function getStarterCarrierByKey(itemKey) {
	return STARTER_CARRIERS.find((item) => item.key === itemKey) || null;
}

export function getStarterBagByKey(itemKey) {
	return STARTER_BAGS.find((item) => item.key === itemKey) || null;
}

export function getStarterLongrangeByKey(itemKey) {
	return STARTER_LONGRANGE.find((item) => item.key === itemKey) || null;
}

export function getStarterUtilityByKey(itemKey) {
	return STARTER_UTILITY.find((item) => item.key === itemKey) || null;
}

