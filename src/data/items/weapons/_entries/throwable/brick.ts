import { defineWeapon, BLUNT, THROWABLE } from '../../helpers/index.js';

export const brick = defineWeapon({
	internalId: 130,
	id: 'brick',
	display: {
			en: {
				name: 'Brick',
				description: 'A classic piece of urban masonry that solves arguments with all the grace of a falling wall.',
			},
		},
	tier: 1,
	grip: 0,
	families: BLUNT | THROWABLE,
	qualityMultipliers: {
		weight: 1.04,
		speed: 0.9,
		edge: 0.52,
		reach: 0.74,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
