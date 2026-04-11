import type { HeroStatDefinition } from '../types.js';

export const intelligence: HeroStatDefinition = {
	name: 'Intelligence',
	shortcode: 'INT',
	type: 'Mental',
	base: true,
	influences: 'Skill learning and crafting quality',
	defaultValue: 10,
};
