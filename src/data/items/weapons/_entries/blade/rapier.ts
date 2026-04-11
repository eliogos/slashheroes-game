import { defineWeapon, BLADE } from '../../helpers/index.js';

export const rapier = defineWeapon({
	internalId: 11,
	id: 'rapier',
	display: {
			en: {
				name: 'Rapier',
				description: 'A thin dueling sword built for fast lunges, exact lines, and punishing thrusts.',
			},
		},
	tier: 2,
	grip: 1,
	families: BLADE,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.08,
		edge: 1.02,
		reach: 1.16,
		curvature: 0.9,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
