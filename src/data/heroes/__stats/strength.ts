import type { HeroStatDefinition } from '../types.js';

export const strength: HeroStatDefinition = {
	name: 'Strength',
	shortcode: 'STR',
	type: 'Physical',
	base: true,
	influences: 'Melee power and critical damage',
	defaultValue: 10,
};
