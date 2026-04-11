import { defineWeapon, STAFF } from '../../helpers/index.js';

export const quarterstaff = defineWeapon({
	internalId: 86,
	id: 'quarterstaff',
	display: {
			en: {
				name: 'Quarterstaff',
				description: 'A reinforced combat staff built for disciplined spins and measured strikes.',
			},
		},
	tier: 2,
	grip: 1,
	families: STAFF,
	qualityMultipliers: {
		speed: 1.02,
		edge: 0.96,
		reach: 1.04,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
