import { defineWeapon, MISC } from '../../helpers/index.js';

export const fork_baton = defineWeapon({
	internalId: 96,
	id: 'fork_baton',
	display: {
			en: {
				name: 'Jitte',
				description: 'A short iron weapon built for catching attacks and punishing openings.',
			},
		},
	tier: 1,
	grip: 1,
	families: MISC,
	qualityMultipliers: {
		weight: 0.92,
		edge: 0.96,
		reach: 0.78,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
