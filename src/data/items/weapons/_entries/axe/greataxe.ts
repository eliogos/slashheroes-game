import { defineWeapon, AXE } from '../../helpers/index.js';

export const greataxe = defineWeapon({
	internalId: 63,
	id: 'greataxe',
	display: {
			en: {
				name: 'Greataxe',
				description: 'An enormous axe that feels oversized even in skilled hands.',
			},
		},
	tier: 6,
	grip: 1,
	families: AXE,
	qualityMultipliers: {
		weight: 1.22,
		speed: 0.86,
		edge: 1.08,
		reach: 1.08,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
