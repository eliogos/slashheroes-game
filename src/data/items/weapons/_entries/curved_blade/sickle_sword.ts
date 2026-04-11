import { defineWeapon, CURVED_BLADE } from '../../helpers/index.js';

export const sickle_sword = defineWeapon({
	internalId: 27,
	id: 'sickle_sword',
	display: {
			en: {
				name: 'Khopesh',
				description: 'A forward-hooking sickle-sword that drags targets into brutal finishing arcs.',
			},
		},
	tier: 5,
	grip: 2,
	families: CURVED_BLADE,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.96,
		edge: 1.04,
		reach: 0.99,
		curvature: 1.4,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
