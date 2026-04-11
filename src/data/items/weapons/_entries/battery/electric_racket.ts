import { defineWeapon, BATTERY, MISC } from '../../helpers/index.js';

export const electric_racket = defineWeapon({
	internalId: 111,
	id: 'electric_racket',
	display: {
			en: {
				name: 'Electric Racket',
				description: 'A crackling racket that swats targets aside with charged mesh and buzzing follow-through.',
			},
		},
	tier: 2,
	grip: 1,
	families: BATTERY | MISC,
	qualityMultipliers: {
		weight: 0.9,
		speed: 1.08,
		edge: 0.84,
		reach: 0.96,
		curvature: 1.1,
	},
	created_at: '2026-03-26T14:55:00.000Z',
});
