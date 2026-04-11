import { defineWeapon, SHIELD } from '../../helpers/index.js';

export const pavise = defineWeapon({
	internalId: 106,
	id: 'pavise',
	display: {
			en: {
				name: 'Pavise',
				description: 'A large portable shield built to turn incoming pressure into a wall.',
			},
		},
	tier: 4,
	grip: 1,
	families: SHIELD,
	qualityMultipliers: {
		weight: 1.26,
		speed: 0.82,
		edge: 0.88,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
