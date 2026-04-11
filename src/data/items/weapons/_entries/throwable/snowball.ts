import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const snowball = defineWeapon({
	internalId: 138,
	id: 'snowball',
	display: {
			en: {
				name: 'Snowball',
				description: 'A cold little handful of winter that feels harmless right until it smacks someone square in the face.',
			},
		},
	tier: 1,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.42,
		speed: 1.12,
		edge: 0.2,
		reach: 0.7,
		curvature: 1.18,
	},
	created_at: '2026-03-26T15:24:00.000Z',
});
