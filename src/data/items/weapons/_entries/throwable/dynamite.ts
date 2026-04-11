import { defineWeapon, MISC, THROWABLE, TOOL } from '../../helpers/index.js';

export const dynamite = defineWeapon({
	internalId: 124,
	id: 'dynamite',
	display: {
			en: {
				name: 'Dynamite',
				description: 'A stick of blasting compound that feels improvised, unstable, and extremely convincing on impact.',
			},
		},
	tier: 3,
	grip: 0,
	families: MISC | TOOL | THROWABLE,
	qualityMultipliers: {
		weight: 0.78,
		speed: 1.04,
		edge: 0.78,
		reach: 0.86,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
