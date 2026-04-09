import { defineRace } from '../helpers/defineRace.js';

export const human = defineRace({
	id: 1,
	name: 'Human',
	emoji: '🧑',
	summary: 'Jack of all trades, master of none',
	description:
		'Humans are the most basic among the races. No innate special abilities, no magic, just sheer stubbornness and determination.',
	inventorySlots: 12,
});
