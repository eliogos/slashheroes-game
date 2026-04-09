import type { HeroStatDefinition } from '../types.js';

export const mana: HeroStatDefinition = {
	id: 5,
	name: 'Mana',
	shortcode: 'MP',
	type: 'Physical',
	influences: 'Spell usage and magical endurance',
	defaultValue: 100,
};
