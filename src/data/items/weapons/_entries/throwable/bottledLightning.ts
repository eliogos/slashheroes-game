import { defineWeapon, BATTERY, MISC, THROWABLE } from '../../helpers/index.js';

export const bottledLightning = defineWeapon({
	internalId: 132,
	id: 'bottledLightning',
	display: {
			en: {
				name: 'Bottled Lightning',
				description: 'A sealed charge flask that bursts into violent arcs the moment its fragile shell gives way.',
			},
		},
	tier: 5,
	grip: 0,
	families: BATTERY | MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.72,
		speed: 1.12,
		edge: 0.94,
		reach: 0.88,
		curvature: 1.16,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
