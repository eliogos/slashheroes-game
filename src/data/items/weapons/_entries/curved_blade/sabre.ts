import { defineWeapon, CURVED_BLADE } from '../../helpers/index.js';

export const sabre = defineWeapon({
	internalId: 24,
	id: 'sabre',
	displayName: 'Sabre',
	description: 'A swift cavalry-style sword that rewards slashing momentum and timing.',
	tags: [
	'swift',
	'dashing',
	'refined',
],
	tier: 3,
	grip: 1,
	families: CURVED_BLADE,
	qualityMultipliers: {
		weight: 0.92,
		speed: 1.07,
		edge: 1.03,
		reach: 1.04,
		curvature: 1.22,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
