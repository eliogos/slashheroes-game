import { defineRace } from '../helpers/defineRace.js';

export const halfling = defineRace({
	id: 5,
	name: 'Halfling',
	emoji: '🍀',
	summary: 'Small size, big luck.',
	description:
		'Halflings are small and not particularly strong, but they make up for it with speed and an unusual amount of luck. Things just tend to work out for them somehow.',
	inventorySlots: 10,
	mods: {
		str: -2,
		agi: 2,
		hp: -1,
		per: 1,
		luk: 2,
		hun: -2,
	},
});
