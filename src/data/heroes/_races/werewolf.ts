import { defineRace } from '../helpers/defineRace.js';

export const werewolf = defineRace({
	id: 9,
	name: 'Werewolf',
	emoji: '🐺',
	summary: 'Loyal heart, wild spirit.',
	description:
		'Werewolves carry a beast within them that never fully rests. They are physically powerful and fiercely loyal to those they consider pack. The curse is real, but so is everything that comes with it.',
	inventorySlots: 13,
	mods: {
		str: 3,
		agi: 1,
		sta: 2,
		hp: 2,
		mp: -2,
		wis: -2,
		int: -2,
		luk: -1,
		hun: -1,
	},
});
