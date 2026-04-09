import { defineRace } from '../helpers/defineRace.js';

export const kobold = defineRace({
	id: 7,
	name: 'Kobold',
	emoji: '🦎',
	summary: 'Tiny, crafty, and way too confident.',
	description:
		'Kobolds are small and physically weak, but they are clever and surprisingly capable with magic. They tend to make up for their size by being annoyingly hard to catch.',
	inventorySlots: 9,
	mods: {
		str: -2,
		agi: 2,
		sta: -1,
		hp: -1,
		mp: 1,
		wis: 1,
		int: 2,
		hun: -2,
	},
});
