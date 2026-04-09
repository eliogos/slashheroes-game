import { defineWeapon, KNIFE } from '../../helpers/index.js';

export const short_blade = defineWeapon({
	internalId: 5,
	id: 'short_blade',
	displayName: 'Tantō',
	description: 'A rigid short blade that favors decisive cuts in tight spaces.',
	tags: [
	'stoic',
	'focused',
	'ceremonial',
],
	tier: 5,
	grip: 1,
	families: KNIFE,
	qualityMultipliers: {
		weight: 1.04,
		speed: 0.99,
		edge: 1.03,
		reach: 1.02,
		curvature: 0.95,
	},
	created_at: '2026-03-26T13:22:44.000Z',
});
