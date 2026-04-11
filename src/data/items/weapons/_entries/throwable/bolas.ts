import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const bolas = defineWeapon({
	internalId: 113,
	id: 'bolas',
	display: {
			en: {
				name: 'Bolas',
				description: 'Weighted cords spun overhead to tangle limbs and turn a clean chase into a helpless stumble.',
			},
		},
	tier: 1,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.72,
		speed: 1,
		edge: 0.75,
		reach: 1.12,
		curvature: 1.35,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
