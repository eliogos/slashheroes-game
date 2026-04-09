import type { HeroStatDefinition } from '../types.js';

export const luck: HeroStatDefinition = {
	id: 9,
	name: 'Luck',
	shortcode: 'LUK',
	type: 'Mental',
	influences: 'Loot drops and random outcomes',
	defaultValue: 10,
};
