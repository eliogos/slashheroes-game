import { defineWeapon, BLADE } from '../../helpers/index.js';

export const cleaver = defineWeapon({
	internalId: 8,
	id: 'cleaver',
	display: {
			en: {
				name: 'Cleaver',
				description: 'A brutal butcher\'s blade repurposed for hacking fights and ugly finishing blows.',
			},
		},
	tier: 1,
	grip: 1,
	families: BLADE,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.94,
		edge: 0.98,
		reach: 0.92,
		curvature: 0.8,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
