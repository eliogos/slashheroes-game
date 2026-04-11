import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const nunchaku = defineWeapon({
	internalId: 39,
	id: 'nunchaku',
	display: {
			en: {
				name: 'Nunchaku',
				description: 'A flexible twin-stick weapon that thrives on rhythm and rapid chaining hits.',
			},
		},
	tier: 3,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 0.72,
		speed: 1.18,
		edge: 0.94,
		reach: 0.88,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
