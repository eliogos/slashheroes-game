import { defineWeapon, SHIELD } from '../../helpers/index.js';

export const greatshield = defineWeapon({
	internalId: 108,
	id: 'greatshield',
	display: {
			en: {
				name: 'Greatshield',
				description: 'An ultimate heavy shield that sacrifices agility for overwhelming protection.',
			},
		},
	tier: 6,
	grip: 1,
	families: SHIELD,
	qualityMultipliers: {
		weight: 1.34,
		speed: 0.72,
		edge: 0.88,
		reach: 1.04,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
