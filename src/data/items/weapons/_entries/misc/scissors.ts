import { defineWeapon, MISC } from '../../helpers/index.js';

export const scissors = defineWeapon({
	internalId: 97,
	id: 'scissors',
	display: {
			en: {
				name: 'Scissors',
				description: 'A cutting tool that becomes surprisingly nasty once used with intent.',
			},
		},
	tier: 1,
	grip: 1,
	families: MISC,
	qualityMultipliers: {
		weight: 0.74,
		speed: 1.05,
		edge: 1.04,
		reach: 0.58,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
