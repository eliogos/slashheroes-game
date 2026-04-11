import { defineWeapon, BLADE, RANGED } from '../../helpers/index.js';

export const chain_sickle = defineWeapon({
	internalId: 95,
	id: 'chain_sickle',
	display: {
			en: {
				name: 'Kusarigama',
				description: 'A chain-sickle hybrid that controls distance before snapping into lethal cuts.',
			},
		},
	tier: 6,
	grip: 2,
	families: BLADE | RANGED,
	qualityMultipliers: {
		weight: 1.04,
		speed: 1.04,
		edge: 1.1,
		reach: 1.22,
		curvature: 1.35,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
