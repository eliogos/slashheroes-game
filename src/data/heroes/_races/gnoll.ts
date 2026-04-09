import { defineRace } from '../helpers/defineRace.js';

export const gnoll = defineRace({
	id: 6,
	name: 'Gnoll',
	emoji: '🦊',
	summary: 'Cunning, sly, and quick on their feet.',
	description:
		'Gnolls are pack hunters by nature. They are quick, strong enough to hold their own, and tend to rely on instinct over strategy. Not the brightest, but they know how to survive.',
	inventorySlots: 12,
	mods: {
		str: 2,
		agi: 1,
		sta: 1,
		mp: -2,
		wis: -1,
		int: -1,
		per: 1,
		hun: -1,
	},
});
