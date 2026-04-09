import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const recurve_bow = defineWeapon({
	internalId: 70,
	id: 'recurve_bow',
	displayName: 'Recurve Bow',
	description: 'A refined curved bow that squeezes more force from every practiced draw.',
	tags: [
	'refined',
	'efficient',
	'taut',
],
	tier: 5,
	grip: 2,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 0.92,
		speed: 1.06,
		reach: 1.1,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
