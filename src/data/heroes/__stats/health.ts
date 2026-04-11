import type { HeroStatDefinition } from '../types.js';

export const health: HeroStatDefinition = {
	name: 'Health',
	shortcode: 'HP',
	type: 'Resource',
	base: true,
	influences: 'Survivability and endurance',
	defaultValue: 100,
};
