import { defineWeapon, KNIFE } from '../../helpers/index.js';

export const dagger = defineWeapon({
	internalId: 1,
	id: 'dagger',
	display: {
			en: {
				name: 'Dagger',
				description: 'A compact starter blade built for simple close-quarters strikes.',
			},
		},
	tier: 1,
	grip: 1,
	families: KNIFE,
	qualityMultipliers: {
		weight: 0.97,
		speed: 1.02,
		edge: 0.99,
		reach: 0.96,
	},
	created_at: '2026-03-26T13:22:44.000Z',
});
