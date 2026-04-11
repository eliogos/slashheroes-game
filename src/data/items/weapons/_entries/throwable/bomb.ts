import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const bomb = defineWeapon({
	internalId: 119,
	id: 'bomb',
	display: {
			en: {
				name: 'Bomb',
				description: 'A crude packed explosive meant to do one loud job and leave a nasty mess behind it.',
			},
		},
	tier: 2,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.96,
		speed: 0.94,
		edge: 0.82,
		reach: 0.8,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
