import { defineCarrier } from '../helpers/index.js';

export const scrollCase = defineCarrier({
	internalId: 3,
	id: 'scroll_case',
	displayName: 'Scroll Case',
	description: 'A hardened cylindrical case that keeps scrolls dry, intact, and sorted. Up to twenty-five scrolls fit inside, stacked up to three per type before they start getting ideas.',
	tags: ['scroll', 'padded', 'organized'],
	rarity: 'uncommon',
	quickAccess: true,
	allowedTypes: ['scroll'],
	slots: 25,
	stackLimitPerType: 3,
	padded: true,
	waterproof: true,
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'aura', id: 'fire_protection', target: 'contents', magnitude: 1.0, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
