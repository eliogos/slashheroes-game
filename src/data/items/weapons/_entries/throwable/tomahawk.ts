import { defineWeapon, AXE, THROWABLE } from '../../helpers/index.js';

export const tomahawk = defineWeapon({
	internalId: 112,
	id: 'tomahawk',
	display: {
			en: {
				name: 'Tomahawk',
				description: 'A compact throwing axe that bites hard for its size and still feels brutal up close.',
			},
		},
	tier: 1,
	grip: 0,
	families: AXE | THROWABLE,
	qualityMultipliers: {
		weight: 0.88,
		speed: 1.08,
		edge: 1.02,
		reach: 0.9,
		curvature: 0.9,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
