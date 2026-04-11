import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const flail = defineWeapon({
	internalId: 40,
	id: 'flail',
	display: {
			en: {
				name: 'Flail',
				description: 'A chain-linked striker that whips around guards with wild momentum.',
			},
		},
	tier: 4,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.03,
		speed: 0.99,
		edge: 1.04,
		reach: 1.06,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
