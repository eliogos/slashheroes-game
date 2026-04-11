import type { HeroStatDefinition } from '../types.js';

export const mana: HeroStatDefinition = {
	name: 'Mana',
	shortcode: 'MP',
	type: 'Resource',
	base: true,
	influences: 'Spell usage and magical endurance',
	defaultValue: 100,
};
