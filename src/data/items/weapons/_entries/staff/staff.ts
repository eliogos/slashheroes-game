import { defineWeapon, STAFF } from '../../helpers/index.js';

export const staff = defineWeapon({
	internalId: 85,
	id: 'staff',
	displayName: 'Staff',
	description: 'A simple wooden pole with plain handling and dependable length.',
	tags: [
	'plain',
	'wooden',
	'steady',
],
	tier: 1,
	grip: 1,
	families: STAFF,
	qualityMultipliers: {
		weight: 0.9,
		edge: 0.95,
		reach: 0.96,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
