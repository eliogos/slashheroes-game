import { defineWeapon, POLEARM, TOOL } from '../../helpers/index.js';

export const battle_rake = defineWeapon({
	internalId: 51,
	id: 'battle_rake',
	display: {
			en: {
				name: 'Battle Rake',
				description: 'A reworked farming rake that snags and jabs with ungainly persistence.',
			},
		},
	tier: 2,
	grip: 1,
	families: POLEARM | TOOL,
	qualityMultipliers: {
		weight: 1.04,
		speed: 0.9,
		edge: 0.96,
		reach: 1.12,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
