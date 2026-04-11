import type { HeroStatDefinition } from '../types.js';

export const experience: HeroStatDefinition = {
	id: 11,
	name: 'Experience',
	shortcode: 'EXP',
	type: 'Derived',
	influences: 'Level growth, unlock pacing, and long-term progression',
	defaultValue: 0,
};
