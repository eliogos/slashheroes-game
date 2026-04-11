import { defineWeapon, BLADE } from '../../helpers/index.js';

export const two_hander = defineWeapon({
	internalId: 12,
	id: 'two_hander',
	display: {
			en: {
				name: 'Zweihänder',
				description: 'A massive battlefield sword that trades speed for sweeping two-handed dominance.',
			},
		},
	tier: 3,
	grip: 2,
	families: BLADE,
	qualityMultipliers: {
		weight: 1.2,
		speed: 0.87,
		edge: 1.04,
		reach: 1.2,
		curvature: 0.85,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
