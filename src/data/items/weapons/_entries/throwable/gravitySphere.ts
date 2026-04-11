import { defineWeapon, BATTERY, MISC, THROWABLE } from '../../helpers/index.js';

export const gravitySphere = defineWeapon({
	internalId: 123,
	id: 'gravitySphere',
	display: {
			en: {
				name: 'Gravity Sphere',
				description: 'A compact sci-fi charge that collapses space into a brief crushing vortex before the field tears itself apart.',
			},
		},
	tier: 6,
	grip: 0,
	families: BATTERY | MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.9,
		speed: 1.12,
		edge: 1.02,
		reach: 0.96,
		curvature: 1.1,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
