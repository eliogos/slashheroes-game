import type { HeroStatDefinition } from '../types.js';

export const stamina: HeroStatDefinition = {
	id: 2,
	name: 'Stamina',
	shortcode: 'STA',
	type: 'Physical',
	influences: 'Action limits and pacing',
	defaultValue: 100,
};
