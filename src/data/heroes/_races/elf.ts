import { defineRace } from '../helpers/defineRace.js';

export const elf = defineRace({
	id: 2,
	name: 'Elf',
	emoji: '🧝‍♂️',
	summary: 'Graceful, sharp, and a little smug',
	description:
		'Elves are long-lived and naturally gifted with magic. They tend to be quicker and more perceptive than most, though centuries of living can make them a little hard to get along with.',
	inventorySlots: 11,
	mods: {
		str: -1,
		agi: 2,
		sta: -1,
		hp: 1,
		mp: 2,
		wis: 1,
		per: 1,
		luk: -1,
		hun: -4,
	},
});
