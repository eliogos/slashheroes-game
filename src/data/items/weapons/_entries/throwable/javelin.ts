import { defineWeapon, POLEARM, THROWABLE } from '../../helpers/index.js';

export const javelin = defineWeapon({
	internalId: 118,
	id: 'javelin',
	display: {
			en: {
				name: 'Javelin',
				description: 'A light war spear built to sail straight through open air before punching into a distant target.',
			},
		},
	tier: 2,
	grip: 0,
	families: POLEARM | THROWABLE,
	qualityMultipliers: {
		weight: 0.92,
		speed: 1.02,
		edge: 1.04,
		reach: 1.14,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
