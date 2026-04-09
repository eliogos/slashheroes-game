import type { HeroStatDefinition } from '../types.js';

export const agility: HeroStatDefinition = {
	id: 4,
	name: 'Agility',
	shortcode: 'AGI',
	type: 'Physical',
	influences: 'Evasion and attack speed',
	defaultValue: 10,
};
