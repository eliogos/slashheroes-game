import { defineWeapon, FIST } from '../../helpers/index.js';

export const boxing_gloves = defineWeapon({
	internalId: 113,
	id: 'boxing_gloves',
	display: {
			en: {
				name: 'Boxing Gloves',
				description: 'Thick padded gloves built for sustained punishment. Hits land heavy and protect the hands just as well.',
			},
		},
	tier: 2,
	grip: 1,
	families: FIST,
	qualityMultipliers: {
		weight: 1.1,
		speed: 0.95,
		edge: 1.06,
		reach: 0.94,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
