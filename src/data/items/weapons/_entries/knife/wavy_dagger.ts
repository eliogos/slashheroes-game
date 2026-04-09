import { defineWeapon, KNIFE } from '../../helpers/index.js';

export const wavy_dagger = defineWeapon({
	internalId: 6,
	id: 'wavy_dagger',
	displayName: 'Kris',
	description: 'A wavy ceremonial blade with unsettling follow-through and ritual weight.',
	tags: [
	'ritual',
	'serpentine',
	'ominous',
],
	tier: 5,
	grip: 1,
	families: KNIFE,
	qualityMultipliers: {
		weight: 0.99,
		speed: 1.02,
		edge: 1.01,
		curvature: 1.3,
	},
	created_at: '2026-03-26T13:22:44.000Z',
});
