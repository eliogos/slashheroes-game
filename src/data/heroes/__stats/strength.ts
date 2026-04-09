import type { HeroStatDefinition } from '../types.js';

export const strength: HeroStatDefinition = {
	id: 3,
	name: 'Strength',
	shortcode: 'STR',
	type: 'Physical',
	influences: 'Melee power and critical damage',
	defaultValue: 10,
};
