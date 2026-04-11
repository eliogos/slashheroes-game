import { defineWeapon, FIREARM } from '../../helpers/index.js';

export const musket = defineWeapon({
	internalId: 79,
	id: 'musket',
	display: {
			en: {
				name: 'Musket',
				description: 'A standard infantry gun meant for disciplined lines and measured volleys.',
			},
		},
	tier: 3,
	grip: 2,
	families: FIREARM,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.94,
		reach: 1.16,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
