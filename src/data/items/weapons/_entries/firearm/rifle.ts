import { defineWeapon, FIREARM } from '../../helpers/index.js';

export const rifle = defineWeapon({
	internalId: 81,
	id: 'rifle',
	display: {
			en: {
				name: 'Rifle',
				description: 'A long precision firearm built to reward calm aim and steady hands.',
			},
		},
	tier: 5,
	grip: 2,
	families: FIREARM,
	qualityMultipliers: {
		weight: 1.02,
		speed: 1.04,
		reach: 1.2,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
