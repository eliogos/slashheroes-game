import { Edible } from './EdibleItem.js';

export const edibles = [
	new Edible('raw_meat')
		.setInternalId(1)
		.setDisplayName('Raw Meat')
		.setDescription("A chunk of meat dropped by something that no longer needs it. Edible in theory, but eating it raw is a bad idea. Cook it first. Keep it cold if you can't.")
		.setTags('meat', 'raw', 'perishable')
		.setRarity('common')
		.setStackable(5)
		.setSubtype('food')
		.setSatiation(10)
		.setRequiresCooking()
		.setCookedFormId('cooked_meat')
		.setRefrigeratable()
		.setDecay(30)
		.addEffect({ hook: 'onUse', id: 'food_poison', target: 'self', magnitude: 5, duration: 20, chance: 1.0 })
		.setCreatedAt('2026-03-31T00:00:00.000Z'),

	new Edible('cooked_meat')
		.setInternalId(2)
		.setDisplayName('Cooked Meat')
		.setDescription("Properly cooked over a fire. Filling, safe, and decent enough that you don't think too hard about where it came from.")
		.setTags('meat', 'cooked', 'perishable')
		.setRarity('common')
		.setStackable(5)
		.setSubtype('food')
		.setSatiation(40)
		.setDecay(100)
		.setCreatedAt('2026-03-31T00:00:00.000Z'),

	new Edible('honeyed_steak')
		.setInternalId(3)
		.setDisplayName('Honeyed Steak')
		.setDescription("Cooked meat glazed with honey. Surprisingly good. The sweetness cuts through the fat and somehow makes it feel worth the effort. Gives a noticeable burst of stamina.")
		.setTags('meat', 'cooked', 'honey', 'perishable')
		.setRarity('uncommon')
		.setStackable(3)
		.setSubtype('food')
		.setSatiation(55)
		.setDecay(80)
		.addEffect({ hook: 'onUse', id: 'stamina_boost', target: 'self', magnitude: 30, duration: 50, chance: 1.0 })
		.setCreatedAt('2026-03-31T00:00:00.000Z'),
];

export const activeEdibles = edibles.filter(entry => !entry.archived);

export function getEdibleById(id) {
	return activeEdibles.find(entry => entry.id === id) ?? null;
}
