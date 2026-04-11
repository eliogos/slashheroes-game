import { defineWeapon, BATTERY, BLADE } from '../../helpers/index.js';

export const chainsaw = defineWeapon({
	internalId: 18,
	id: 'chainsaw',
	display: {
			en: {
				name: 'Chainsaw',
				description: 'A roaring motorized cutter that shreds through targets while its battery still holds.',
			},
		},
	tier: 6,
	grip: 2,
	families: BATTERY | BLADE,
	qualityMultipliers: {
		weight: 1.09,
		speed: 1.08,
		edge: 1.15,
		reach: 0.93,
		curvature: 0.55,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
