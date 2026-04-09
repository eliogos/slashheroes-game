import { defineRace } from '../helpers/defineRace.js';

export const fairy = defineRace({
	id: 8,
	name: 'Fairy',
	emoji: '🧚',
	summary: 'Glitter, giggles, and mischief.',
	description:
		'Fairies are ancient nature spirits. Magically powerful and surprisingly wise, though they are also fragile and tend to follow their whims more than any plan.',
	inventorySlots: 8,
	mods: {
		str: -3,
		agi: 3,
		sta: -2,
		hp: -2,
		mp: 3,
		wis: 2,
		int: 2,
		luk: -1,
		hun: -2,
	},
});
