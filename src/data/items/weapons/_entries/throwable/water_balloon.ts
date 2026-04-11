import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const water_balloon = defineWeapon({
	internalId: 139,
	id: 'water_balloon',
	display: {
			en: {
				name: 'Water Balloon',
				description: 'A thin latex pouch of water that bursts on impact with a satisfying splash and absolutely zero lethality.',
			},
		},
	tier: 1,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.32,
		speed: 0.92,
		edge: 0.1,
		reach: 0.68,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
