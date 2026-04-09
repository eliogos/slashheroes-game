import type { HeroStatDefinition } from '../types.js';

export const intelligence: HeroStatDefinition = {
	id: 7,
	name: 'Intelligence',
	shortcode: 'INT',
	type: 'Mental',
	influences: 'Skill learning and crafting quality',
	defaultValue: 10,
};
