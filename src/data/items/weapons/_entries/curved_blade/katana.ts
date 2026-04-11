import { defineWeapon, CURVED_BLADE } from '../../helpers/index.js';

export const katana = defineWeapon({
	internalId: 26,
	id: 'katana',
	display: {
			en: {
				name: 'Katana',
				description: 'A disciplined two-handed sword prized for clean technique and lethal precision.',
			},
		},
	tier: 5,
	grip: 2,
	families: CURVED_BLADE,
	qualityMultipliers: {
		weight: 0.98,
		speed: 1.06,
		edge: 1.1,
		reach: 1.08,
		curvature: 1.25,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
