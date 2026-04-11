import { defineWeapon, LEGENDARY, MISC } from '../../helpers/index.js';

export const warfan = defineWeapon({
	internalId: 99,
	id: 'warfan',
	display: {
			en: {
				name: 'Tessen',
				description: 'A Japanese war fan that hides iron ribs inside graceful folds for sudden blocks and disciplined strikes.',
			},
		},
	tier: 6,
	grip: 1,
	families: LEGENDARY | MISC,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.2,
		edge: 1.5,
		reach: 0.88,
		curvature: 1.22,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
