import { defineWeapon, POLEARM, TOOL } from '../../helpers/index.js';

export const pitchfork = defineWeapon({
	internalId: 48,
	id: 'pitchfork',
	display: {
			en: {
				name: 'Pitchfork',
				description: 'A farming fork pressed into service with awkward but useful reach.',
			},
		},
	tier: 1,
	grip: 1,
	families: POLEARM | TOOL,
	qualityMultipliers: {
		weight: 0.96,
		speed: 0.94,
		edge: 1.03,
		reach: 1.08,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
