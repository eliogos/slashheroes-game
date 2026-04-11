import { defineWeapon, BATTERY, RANGED } from '../../helpers/index.js';

export const electric_whip = defineWeapon({
	internalId: 94,
	id: 'electric_whip',
	display: {
			en: {
				name: 'Electric Whip',
				description: 'A powered lash that mixes long-range control with crackling punishment.',
			},
		},
	tier: 3,
	grip: 1,
	families: BATTERY | RANGED,
	qualityMultipliers: {
		weight: 0.88,
		speed: 1.12,
		edge: 1.02,
		reach: 1.16,
		curvature: 1.14,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
