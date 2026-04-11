import type { HeroStatDefinition } from '../types.js';

export const luck: HeroStatDefinition = {
	name: 'Luck',
	shortcode: 'LUK',
	type: 'Mental',
	base: true,
	influences: 'Loot drops and random outcomes',
	defaultValue: 10,
};
