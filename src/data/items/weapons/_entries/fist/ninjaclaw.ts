import { defineWeapon, FIST, KNIFE } from '../../helpers/index.js';

export const ninjaclaw = defineWeapon({
	internalId: 115,
	id: 'ninjaclaw',
	display: {
			en: {
				name: 'Tekkō-kagi',
				description: 'A set of hand claws designed for ninjas — rakes across flesh with curved iron tines and punishes anything that gets too close.',
			},
		},
	tier: 5,
	grip: 1,
	families: FIST | KNIFE,
	qualityMultipliers: {
		weight: 0.91,
		speed: 1.1,
		edge: 1.14,
		reach: 0.85,
		curvature: 1.4,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
