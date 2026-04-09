import type { HeroStatDefinition } from '../types.js';

export const health: HeroStatDefinition = {
	id: 1,
	name: 'Health',
	shortcode: 'HP',
	type: 'Physical',
	influences: 'Survivability and endurance',
	defaultValue: 100,
};
