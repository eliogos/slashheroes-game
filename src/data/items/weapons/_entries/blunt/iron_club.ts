import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const iron_club = defineWeapon({
	internalId: 45,
	id: 'iron_club',
	display: {
			en: {
				name: 'Kanabo',
				description: 'A monstrous spiked club that turns every swing into a punishment.',
			},
		},
	tier: 5,
	grip: 2,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.22,
		speed: 0.84,
		edge: 1.05,
		reach: 1.05,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
