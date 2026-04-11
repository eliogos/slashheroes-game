import { defineWeapon, FIREARM } from '../../helpers/index.js';

export const bazooka = defineWeapon({
	internalId: 83,
	id: 'bazooka',
	display: {
			en: {
				name: 'Bazooka',
				description: 'An explosive launcher engineered for oversized destruction and backblast terror.',
			},
		},
	tier: 6,
	grip: 2,
	families: FIREARM,
	qualityMultipliers: {
		weight: 1.32,
		speed: 0.72,
		reach: 1.1,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
