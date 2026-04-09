import { defineWeapon, BLADE } from '../../helpers/index.js';

export const longsword = defineWeapon({
	internalId: 14,
	id: 'longsword',
	displayName: 'Longsword',
	description: 'A versatile war sword with reliable reach, clean handling, and disciplined offense.',
	tags: [
	'martial',
	'versatile',
	'steadfast',
],
	tier: 4,
	grip: 1,
	families: BLADE,
	qualityMultipliers: {
		edge: 1.02,
		reach: 1.04,
		curvature: 0.95,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
