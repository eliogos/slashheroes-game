import { defineRace } from '../helpers/defineRace.js';

export const dwarf = defineRace({
	id: 3,
	name: 'Dwarf',
	emoji: '⛏️',
	summary: 'Tough as the mountain they came from',
	description:
		'Dwarves come from deep underground and it shows. They are tough, strong, and built to outlast just about anything. Not the fastest or the most magical, but incredibly hard to put down.',
	inventorySlots: 13,
	mods: {
		str: 2,
		agi: -2,
		sta: 2,
		hp: 2,
		mp: -1,
		wis: -1,
		int: -1,
		hun: -1,
	},
});
