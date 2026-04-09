import { defineEdible } from '../helpers/index.js';

export const cooked_meat = defineEdible({
	internalId: 2,
	id: 'cooked_meat',
	displayName: 'Cooked Meat',
	description: "Properly cooked over a fire. Filling, safe, and decent enough that you don't think too hard about where it came from.",
	tags: ['meat', 'cooked', 'perishable'],
	rarity: 'common',
	stackable: 5,
	subtype: 'food',
	satiation: 40,
	decay: 100,
	created_at: '2026-03-31T00:00:00.000Z',
});
