import { defineWeapon, POLEARM } from '../../helpers/index.js';

export const pole_blade = defineWeapon({
	internalId: 54,
	id: 'pole_blade',
	display: {
			en: {
				name: 'Naginata',
				description: 'A sweeping polearm that mixes elegant handling with punishing long arcs.',
			},
		},
	tier: 4,
	grip: 1,
	families: POLEARM,
	qualityMultipliers: {
		weight: 0.97,
		speed: 1.01,
		edge: 1.08,
		reach: 1.14,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
