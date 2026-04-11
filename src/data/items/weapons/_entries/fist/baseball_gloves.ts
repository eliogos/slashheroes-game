import { defineWeapon, FIST } from '../../helpers/index.js';

export const baseball_gloves = defineWeapon({
	internalId: 112,
	id: 'baseball_gloves',
	display: {
			en: {
				name: 'Baseball Gloves',
				description: 'Worn leather batting gloves repurposed for brawling. Light and comfortable, but they do the job.',
			},
		},
	tier: 1,
	grip: 1,
	families: FIST,
	qualityMultipliers: {
		weight: 0.45,
		speed: 0.72,
		edge: 0.38,
		reach: 0.68,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
