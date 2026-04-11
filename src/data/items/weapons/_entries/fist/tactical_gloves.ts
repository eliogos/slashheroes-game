import { defineWeapon, FIST } from '../../helpers/index.js';

export const tactical_gloves = defineWeapon({
	internalId: 114,
	id: 'tactical_gloves',
	display: {
			en: {
				name: 'Tactical Gloves',
				description: 'Military-grade combat gloves with reinforced knuckles and non-slip grip. Built for fighters who mean business.',
			},
		},
	tier: 3,
	grip: 1,
	families: FIST,
	qualityMultipliers: {
		weight: 0.96,
		speed: 1.02,
		edge: 1.08,
		reach: 0.9,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
