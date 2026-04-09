import type { HeroStatDefinition } from '../types.js';

export const perception: HeroStatDefinition = {
	id: 8,
	name: 'Perception',
	shortcode: 'PER',
	type: 'Mental',
	influences: 'Detection, accuracy, and crit chance',
	defaultValue: 10,
};
