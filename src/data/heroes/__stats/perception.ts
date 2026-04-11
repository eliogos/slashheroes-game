import type { HeroStatDefinition } from '../types.js';

export const perception: HeroStatDefinition = {
	name: 'Perception',
	shortcode: 'PER',
	type: 'Mental',
	base: true,
	influences: 'Detection, accuracy, and crit chance',
	defaultValue: 10,
};
