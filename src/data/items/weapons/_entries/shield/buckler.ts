import { defineWeapon, SHIELD } from '../../helpers/index.js';

export const buckler = defineWeapon({
	internalId: 101,
	id: 'buckler',
	display: {
			en: {
				name: 'Buckler',
				description: 'A compact hand shield meant for quick parries and close-in confidence.',
			},
		},
	tier: 1,
	grip: 1,
	families: SHIELD,
	qualityMultipliers: {
		weight: 0.74,
		speed: 1.1,
		edge: 0.9,
		reach: 0.7,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
