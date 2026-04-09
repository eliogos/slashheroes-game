import { defineWeapon, BLUNT, RANGED } from '../../helpers/index.js';

export const yo_yo = defineWeapon({
	internalId: 93,
	id: 'yo_yo',
	displayName: 'Yo-yo',
	description: 'A weighted tethered toy turned into a looping weapon with odd rhythm.',
	tags: [
	'playful',
	'looping',
	'eccentric',
],
	tier: 2,
	grip: 1,
	families: BLUNT | RANGED,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.06,
		edge: 0.92,
		reach: 0.94,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
