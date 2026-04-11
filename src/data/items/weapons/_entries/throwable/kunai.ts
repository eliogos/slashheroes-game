import { defineWeapon, KNIFE, THROWABLE, TOOL } from '../../helpers/index.js';

export const kunai = defineWeapon({
	internalId: 117,
	id: 'kunai',
	display: {
			en: {
				name: 'Kunai',
				description: 'A pointed utility knife that throws cleanly, sticks deep, and doubles as a rough climbing or digging tool.',
			},
		},
	tier: 2,
	grip: 0,
	families: KNIFE | TOOL | THROWABLE,
	qualityMultipliers: {
		weight: 0.62,
		speed: 1.12,
		edge: 1.02,
		reach: 0.88,
		curvature: 0.95,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
