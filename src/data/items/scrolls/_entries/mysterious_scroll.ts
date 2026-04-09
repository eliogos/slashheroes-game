import { defineScroll } from '../helpers/index.js';

export const mysterious_scroll = defineScroll({
	internalId: 1,
	id: 'mysterious_scroll',
	displayName: 'Mysterious Scroll',
	description: 'A sealed arcane scroll covered in symbols that seem to rearrange themselves every time you blink.',
	tags: ['scroll', 'arcane', 'unstable'],
	rarity: 'common',
	stackable: 10,
	spellId: 'random_spell',
	school: 'arcane',
	charges: 1,
	castTime: 1,
	intelligenceRequirement: 0,
	failChance: 0.05,
	fragile: true,
	singleUse: true,
	effects: [
		{ hook: 'onUse', id: 'cast_random_spell', target: 'self', magnitude: 1, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
