import { defineWeapon, CURVED_BLADE, TOOL } from '../../helpers/index.js';

export const bolo_knife = defineWeapon({
	internalId: 21,
	id: 'bolo_knife',
	display: {
			en: {
				name: 'Bolo Knife',
				description: 'A dense utility chopper that hits harder than its size suggests.',
			},
		},
	tier: 2,
	grip: 1,
	families: CURVED_BLADE | TOOL,
	qualityMultipliers: {
		weight: 1.02,
		speed: 1.01,
		reach: 0.94,
		curvature: 1.18,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
