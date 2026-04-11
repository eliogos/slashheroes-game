import { defineWeapon, CURVED_BLADE } from '../../helpers/index.js';

export const great_blade = defineWeapon({
	internalId: 28,
	id: 'great_blade',
	display: {
			en: {
				name: 'Ōdachi',
				description: 'An oversized war sword with sweeping reach and fearsome cutting authority.',
			},
		},
	tier: 6,
	grip: 2,
	families: CURVED_BLADE,
	qualityMultipliers: {
		weight: 1.16,
		speed: 0.92,
		edge: 1.08,
		reach: 1.22,
		curvature: 1.15,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
