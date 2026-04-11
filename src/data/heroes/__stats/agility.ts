import type { HeroStatDefinition } from '../types.js';

export const agility: HeroStatDefinition = {
	name: 'Agility',
	shortcode: 'AGI',
	type: 'Physical',
	base: true,
	influences: 'Evasion and attack speed',
	defaultValue: 10,
};
