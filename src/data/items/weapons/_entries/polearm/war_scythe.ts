import { defineWeapon, POLEARM } from '../../helpers/index.js';

export const war_scythe = defineWeapon({
	internalId: 57,
	id: 'war_scythe',
	display: {
			en: {
				name: 'War Scythe',
				description: 'A reaped farming tool remade into a lethal weapon with vicious pulling cuts.',
			},
		},
	tier: 6,
	grip: 1,
	families: POLEARM,
	qualityMultipliers: {
		weight: 1.02,
		speed: 0.96,
		edge: 1.1,
		reach: 1.2,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
