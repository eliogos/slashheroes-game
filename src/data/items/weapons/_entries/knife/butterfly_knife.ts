import { defineWeapon, KNIFE } from '../../helpers/index.js';

export const butterfly_knife = defineWeapon({
	internalId: 4,
	id: 'butterfly_knife',
	display: {
			en: {
				name: 'Balisong',
				description: 'A folding blade with flashy handling and deceptive attack timing.',
			},
		},
	tier: 4,
	grip: 1,
	families: KNIFE,
	qualityMultipliers: {
		weight: 1.03,
		speed: 1.03,
		edge: 0.99,
		reach: 0.97,
	},
	created_at: '2026-03-26T13:22:44.000Z',
});
