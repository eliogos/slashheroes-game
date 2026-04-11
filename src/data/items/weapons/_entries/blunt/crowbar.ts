import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const crowbar = defineWeapon({
	internalId: 32,
	id: 'crowbar',
	display: {
			en: {
				name: 'Crowbar',
				description: 'A prying tool repurposed into a compact weapon with nasty leverage.',
			},
		},
	tier: 2,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.02,
		speed: 0.97,
		edge: 0.98,
		reach: 0.92,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
