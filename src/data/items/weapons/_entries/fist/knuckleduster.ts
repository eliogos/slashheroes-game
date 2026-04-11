import { defineWeapon, FIST } from '../../helpers/index.js';

export const knuckleduster = defineWeapon({
	internalId: 74,
	id: 'knuckleduster',
	display: {
			en: {
				name: 'Knuckleduster',
				description: 'A metal fist weapon built to turn compact punches into brutal impacts.',
			},
		},
	tier: 3,
	grip: 1,
	families: FIST,
	qualityMultipliers: {
		weight: 1.05,
		edge: 1.03,
		reach: 0.86,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
