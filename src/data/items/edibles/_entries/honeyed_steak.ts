import { defineEdible } from '../helpers/index.js';

export const honeyed_steak = defineEdible({
	internalId: 3,
	id: 'honeyed_steak',
	displayName: 'Honeyed Steak',
	description: 'Cooked meat glazed with honey. Surprisingly good. The sweetness cuts through the fat and somehow makes it feel worth the effort. Gives a noticeable burst of stamina.',
	tags: ['meat', 'cooked', 'honey', 'perishable'],
	rarity: 'uncommon',
	stackable: 3,
	subtype: 'food',
	satiation: 55,
	decay: 80,
	effects: [
		{ hook: 'onUse', id: 'stamina_boost', target: 'self', magnitude: 30, duration: 50, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
