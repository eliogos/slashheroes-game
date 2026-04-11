import type { HeroStatDefinition } from '../types.js';

export const experience: HeroStatDefinition = {
	name: 'Experience',
	shortcode: 'EXP',
	type: 'Progression',
	base: false,
	influences: 'Level growth, unlock pacing, and long-term progression',
	defaultValue: 0,
};
