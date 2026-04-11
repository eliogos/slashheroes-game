import { defineWeapon, AXE } from '../../helpers/index.js';

export const war_pick = defineWeapon({
	internalId: 62,
	id: 'war_pick',
	display: {
			en: {
				name: 'War Pick',
				description: 'A piercing battlefield weapon focused on punching through hard protection.',
			},
		},
	tier: 5,
	grip: 1,
	families: AXE,
	qualityMultipliers: {
		weight: 1.04,
		speed: 0.94,
		edge: 1.14,
		reach: 0.94,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
