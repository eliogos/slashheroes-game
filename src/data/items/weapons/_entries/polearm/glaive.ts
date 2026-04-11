import { defineWeapon, POLEARM } from '../../helpers/index.js';

export const glaive = defineWeapon({
	internalId: 55,
	id: 'glaive',
	display: {
			en: {
				name: 'Glaive',
				description: 'A single-edged polearm that rewards long arcs and committed cuts.',
			},
		},
	tier: 5,
	grip: 1,
	families: POLEARM,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.95,
		edge: 1.07,
		reach: 1.18,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
