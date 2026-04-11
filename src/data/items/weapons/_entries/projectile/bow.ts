import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const bow = defineWeapon({
	internalId: 67,
	id: 'bow',
	display: {
			en: {
				name: 'Bow',
				description: 'A standard bow that balances draw speed, range, and dependable control.',
			},
		},
	tier: 2,
	grip: 2,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 0.96,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
