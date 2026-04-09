import { defineWeapon, SHIELD } from '../../helpers/index.js';

export const round_shield = defineWeapon({
	internalId: 102,
	id: 'round_shield',
	displayName: 'Round Shield',
	description: 'A standard shield with balanced coverage and steady battlefield utility.',
	tags: [
	'balanced',
	'sturdy',
	'dependable',
],
	tier: 2,
	grip: 1,
	families: SHIELD,
	qualityMultipliers: {
		weight: 0.96,
		edge: 0.9,
		reach: 0.88,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
