import { defineWeapon, BLADE } from '../../helpers/index.js';

export const falchion = defineWeapon({
	internalId: 13,
	id: 'falchion',
	display: {
			en: {
				name: 'Falchion',
				description: 'A forward-weighted slashing sword that bites hard through wide, committed arcs.',
			},
		},
	tier: 3,
	grip: 1,
	families: BLADE,
	qualityMultipliers: {
		weight: 1.04,
		speed: 0.98,
		edge: 1.05,
		reach: 0.95,
		curvature: 1.35,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
