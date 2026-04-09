import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const sling = defineWeapon({
	internalId: 64,
	id: 'sling',
	displayName: 'Sling',
	description: 'A simple launcher that turns loose stones into cheap ranged pressure.',
	tags: [
	'simple',
	'frugal',
	'whirling',
],
	tier: 1,
	grip: 2,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 0.72,
		speed: 0.92,
		reach: 0.82,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
