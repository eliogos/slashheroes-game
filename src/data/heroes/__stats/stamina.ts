import type { HeroStatDefinition } from '../types.js';

export const stamina: HeroStatDefinition = {
	name: 'Stamina',
	shortcode: 'STA',
	type: 'Resource',
	base: true,
	influences: 'Action limits and pacing',
	defaultValue: 100,
};
