import { defineWeapon, FIREARM } from '../../helpers/index.js';

export const blunderbuss = defineWeapon({
	internalId: 78,
	id: 'blunderbuss',
	display: {
			en: {
				name: 'Blunderbuss',
				description: 'A short brutal scatter gun built for chaos at punishingly close range.',
			},
		},
	tier: 2,
	grip: 1,
	families: FIREARM,
	qualityMultipliers: {
		weight: 1.06,
		speed: 0.88,
		reach: 0.76,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
