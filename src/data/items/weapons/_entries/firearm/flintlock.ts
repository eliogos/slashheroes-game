import { defineWeapon, FIREARM } from '../../helpers/index.js';

export const flintlock = defineWeapon({
	internalId: 77,
	id: 'flintlock',
	display: {
			en: {
				name: 'Flintlock',
				description: 'An early single-shot firearm that rewards nerve and deliberate timing.',
			},
		},
	tier: 1,
	grip: 1,
	families: FIREARM,
	qualityMultipliers: {
		weight: 0.84,
		speed: 0.92,
		reach: 0.88,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
