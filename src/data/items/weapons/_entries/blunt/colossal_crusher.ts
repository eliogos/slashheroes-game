import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const colossal_crusher = defineWeapon({
	internalId: 47,
	id: 'colossal_crusher',
	display: {
			en: {
				name: 'Colossal Crusher',
				description: 'An absurdly oversized hammer built for pure destructive spectacle.',
			},
		},
	tier: 6,
	grip: 2,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.34,
		speed: 0.72,
		reach: 1.12,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
