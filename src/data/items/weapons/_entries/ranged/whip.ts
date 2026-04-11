import { defineWeapon, RANGED } from '../../helpers/index.js';

export const whip = defineWeapon({
	internalId: 92,
	id: 'whip',
	display: {
			en: {
				name: 'Whip',
				description: 'A flexible long-range weapon that punishes spacing and timing mistakes.',
			},
		},
	tier: 1,
	grip: 1,
	families: RANGED,
	qualityMultipliers: {
		weight: 0.76,
		speed: 1.08,
		edge: 0.98,
		reach: 1.18,
		curvature: 1.18,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
