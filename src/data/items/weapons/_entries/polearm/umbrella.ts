import { defineWeapon, POLEARM, SHIELD } from '../../helpers/index.js';

export const umbrella = defineWeapon({
	internalId: 100,
	id: 'umbrella',
	display: {
			en: {
				name: 'Umbrella',
				description: 'A light improvised guard that pokes, blocks, and survives bad weather.',
			},
		},
	tier: 1,
	grip: 1,
	families: POLEARM | SHIELD,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.02,
		edge: 0.94,
		reach: 1.08,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
