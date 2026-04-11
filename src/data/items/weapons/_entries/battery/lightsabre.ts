import { defineWeapon, BATTERY } from '../../helpers/index.js';

export const lightsabre = defineWeapon({
	internalId: 91,
	id: 'lightsabre',
	display: {
			en: {
				name: 'Lightsabre',
				description: 'A bladeless weapon of concentrated light that cuts with impossible cleanliness.',
			},
		},
	tier: 6,
	grip: 1,
	families: BATTERY,
	qualityMultipliers: {
		weight: 0.78,
		speed: 1.22,
		edge: 1.22,
		reach: 1.02,
		curvature: 0.85,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
