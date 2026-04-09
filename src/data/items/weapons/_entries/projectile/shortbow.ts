import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const shortbow = defineWeapon({
	internalId: 65,
	id: 'shortbow',
	displayName: 'Shortbow',
	description: 'A compact bow with fast draw speed and easy handling at short range.',
	tags: [
	'compact',
	'nimble',
	'responsive',
],
	tier: 1,
	grip: 2,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 0.84,
		speed: 1.05,
		reach: 0.92,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
