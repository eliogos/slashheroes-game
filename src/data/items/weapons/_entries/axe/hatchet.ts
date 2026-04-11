import { defineWeapon, AXE } from '../../helpers/index.js';

export const hatchet = defineWeapon({
	internalId: 58,
	id: 'hatchet',
	display: {
			en: {
				name: 'Hatchet',
				description: 'A small chopping axe suited to quick one-handed swings and field work.',
			},
		},
	tier: 1,
	grip: 1,
	families: AXE,
	qualityMultipliers: {
		weight: 0.84,
		speed: 1.08,
		edge: 1.02,
		reach: 0.78,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
