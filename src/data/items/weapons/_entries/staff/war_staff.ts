import { defineWeapon, STAFF } from '../../helpers/index.js';

export const war_staff = defineWeapon({
	internalId: 88,
	id: 'war_staff',
	displayName: 'War Staff',
	description: 'A combat-optimized staff hardened for forceful sweeps and stubborn defense.',
	tags: [
	'hardened',
	'forceful',
	'disciplined',
],
	tier: 5,
	grip: 1,
	families: STAFF,
	qualityMultipliers: {
		weight: 1.12,
		speed: 0.98,
		edge: 1.04,
		reach: 1.12,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
