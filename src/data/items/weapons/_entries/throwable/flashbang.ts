import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const flashbang = defineWeapon({
	internalId: 125,
	id: 'flashbang',
	display: {
			en: {
				name: 'Flash Bang',
				description: 'A stunning burst grenade that prioritizes blinding shock over outright lethal force.',
			},
		},
	tier: 4,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.74,
		speed: 1.06,
		edge: 0.68,
		reach: 0.84,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
