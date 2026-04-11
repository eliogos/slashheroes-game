import { defineWeapon, BLUNT, THROWABLE, TOOL } from '../../helpers/index.js';

export const tacticalShovel = defineWeapon({
	internalId: 129,
	id: 'tacticalShovel',
	display: {
			en: {
				name: 'Tactical Shovel',
				description: 'A compact entrenching shovel that digs, chops, and throws with alarming enthusiasm.',
			},
		},
	tier: 2,
	grip: 0,
	families: BLUNT | TOOL | THROWABLE,
	qualityMultipliers: {
		weight: 0.98,
		speed: 0.98,
		edge: 0.92,
		reach: 0.88,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
