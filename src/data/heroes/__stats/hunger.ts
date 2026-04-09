import type { HeroStatDefinition } from '../types.js';

export const hunger: HeroStatDefinition = {
	id: 10,
	name: 'Hunger',
	shortcode: 'HUN',
	type: 'Derived',
	influences: 'Recovery and overall performance',
	defaultValue: 100,
};
