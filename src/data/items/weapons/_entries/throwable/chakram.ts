import { defineWeapon, CURVED_BLADE, THROWABLE } from '../../helpers/index.js';

export const chakram = defineWeapon({
	internalId: 128,
	id: 'chakram',
	display: {
			en: {
				name: 'Chakram',
				description: 'A sharpened war ring that flies flat, slices wide, and punishes anything caught in its line.',
			},
		},
	tier: 4,
	grip: 0,
	families: CURVED_BLADE | THROWABLE,
	qualityMultipliers: {
		weight: 0.78,
		speed: 1.1,
		edge: 1.08,
		reach: 1.06,
		curvature: 1.32,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
