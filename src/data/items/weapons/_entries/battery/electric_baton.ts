import { defineWeapon, BATTERY, BLUNT } from '../../helpers/index.js';

export const electric_baton = defineWeapon({
	internalId: 35,
	id: 'electric_baton',
	display: {
			en: {
				name: 'Electric Baton',
				description: 'A charged enforcement baton that mixes blunt trauma with powered shocks.',
			},
		},
	tier: 3,
	grip: 1,
	families: BATTERY | BLUNT,
	qualityMultipliers: {
		weight: 0.9,
		speed: 1.08,
		edge: 1.02,
		reach: 0.82,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
