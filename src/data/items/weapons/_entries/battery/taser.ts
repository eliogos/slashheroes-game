import { defineWeapon, BATTERY } from '../../helpers/index.js';

export const taser = defineWeapon({
	internalId: 90,
	id: 'taser',
	display: {
			en: {
				name: 'Taser',
				description: 'A compact electric shock weapon built for close-range stuns and dirty little jolts.',
			},
		},
	tier: 1,
	grip: 1,
	families: BATTERY,
	qualityMultipliers: {
		weight: 0.52,
		speed: 1.12,
		edge: 0.96,
		reach: 0.52,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
