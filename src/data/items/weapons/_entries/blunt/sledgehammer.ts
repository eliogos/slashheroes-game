import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const sledgehammer = defineWeapon({
	internalId: 37,
	id: 'sledgehammer',
	display: {
			en: {
				name: 'Sledgehammer',
				description: 'A massive work hammer turned into a devastating two-handed breaker.',
			},
		},
	tier: 3,
	grip: 2,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.24,
		speed: 0.78,
		reach: 1.08,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
