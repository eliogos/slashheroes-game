import { defineRace } from '../helpers/defineRace.js';

export const orc = defineRace({
	id: 4,
	name: 'Orc',
	emoji: '🪓',
	summary: 'Built for battle, fueled by pride',
	description:
		'Orcs are a warrior race, raised in clans where strength and combat are a way of life. They are physically imposing and built to take punishment as well as dish it out.',
	inventorySlots: 15,
	mods: {
		str: 3,
		agi: -1,
		sta: 1,
		hp: 2,
		mp: -2,
		wis: -1,
		int: -1,
		hun: -1,
	},
});
