import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const war_hammer = defineWeapon({
	internalId: 43,
	id: 'war_hammer',
	display: {
			en: {
				name: 'War Hammer',
				description: 'A battlefield hammer designed to punch through armor with focused force.',
			},
		},
	tier: 5,
	grip: 2,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.12,
		speed: 0.92,
		edge: 1.18,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
