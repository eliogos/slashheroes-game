import { defineWeapon, POLEARM } from '../../helpers/index.js';

export const trident = defineWeapon({
	internalId: 53,
	id: 'trident',
	display: {
			en: {
				name: 'Trident',
				description: 'A three-pronged spear that controls space with punishing outward pressure.',
			},
		},
	tier: 3,
	grip: 1,
	families: POLEARM,
	qualityMultipliers: {
		weight: 1.06,
		speed: 0.95,
		edge: 1.02,
		reach: 1.1,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
