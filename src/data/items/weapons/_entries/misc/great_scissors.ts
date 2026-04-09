import { defineWeapon, MISC } from '../../helpers/index.js';

export const great_scissors = defineWeapon({
	internalId: 98,
	id: 'great_scissors',
	displayName: 'Great Scissors',
	description: 'An absurd oversized cutting tool turned into a ridiculous but dangerous showpiece.',
	tags: [
	'absurd',
	'theatrical',
	'savage',
],
	tier: 6,
	grip: 2,
	families: MISC,
	qualityMultipliers: {
		weight: 1.35,
		speed: 0.82,
		edge: 1.28,
		reach: 1.08,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
