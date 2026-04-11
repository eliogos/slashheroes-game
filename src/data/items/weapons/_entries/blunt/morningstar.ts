import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const morningstar = defineWeapon({
	internalId: 41,
	id: 'morningstar',
	display: {
			en: {
				name: 'Morningstar',
				description: 'A brutal spiked weapon that lands heavy impacts with ugly finishing bites.',
			},
		},
	tier: 4,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.94,
		edge: 1.08,
		reach: 0.98,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
