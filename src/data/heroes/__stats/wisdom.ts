import type { HeroStatDefinition } from '../types.js';

export const wisdom: HeroStatDefinition = {
	name: 'Wisdom',
	shortcode: 'WIS',
	type: 'Mental',
	base: true,
	influences: 'XP gain and mana growth',
	defaultValue: 10,
};
