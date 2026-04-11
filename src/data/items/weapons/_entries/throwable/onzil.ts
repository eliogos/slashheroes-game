import { defineWeapon, BLADE, THROWABLE } from '../../helpers/index.js';

export const onzil = defineWeapon({
	internalId: 126,
	id: 'onzil',
	display: {
			en: {
				name: 'Onzil',
				description: 'A multi-bladed African throwing knife shaped to cut on the spin and look menacing even at rest.',
			},
		},
	tier: 4,
	grip: 0,
	families: BLADE | THROWABLE,
	qualityMultipliers: {
		weight: 1.06,
		speed: 1,
		edge: 1.12,
		reach: 0.96,
		curvature: 1.15,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
