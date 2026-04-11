import { defineWeapon, BLADE } from '../../helpers/index.js';

export const shortsword = defineWeapon({
	internalId: 9,
	id: 'shortsword',
	display: {
			en: {
				name: 'Shortsword',
				description: 'A compact training sword built for dependable cuts, simple drills, and steady beginner footwork.',
			},
		},
	tier: 1,
	grip: 1,
	families: BLADE,
	qualityMultipliers: {
		weight: 0.96,
		speed: 1.01,
		reach: 0.95,
		curvature: 0.95,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
