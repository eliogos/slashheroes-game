import { defineWeapon, BLADE } from '../../helpers/index.js';

export const claymore = defineWeapon({
	internalId: 17,
	id: 'claymore',
	displayName: 'Claymore',
	description: 'A broad two-handed war sword built for commanding reach and decisive battlefield cuts.',
	tags: [
	'noble',
	'disciplined',
	'commanding',
],
	tier: 6,
	grip: 2,
	families: BLADE,
	qualityMultipliers: {
		weight: 1.1,
		speed: 0.94,
		edge: 1.04,
		reach: 1.14,
		curvature: 0.92,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
