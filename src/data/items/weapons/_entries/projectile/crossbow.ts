import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const crossbow = defineWeapon({
	internalId: 68,
	id: 'crossbow',
	display: {
			en: {
				name: 'Crossbow',
				description: 'A mechanized ranged weapon that favors punch and ease over draw rhythm.',
			},
		},
	tier: 3,
	grip: 1,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 1.18,
		speed: 0.94,
		reach: 1.08,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
