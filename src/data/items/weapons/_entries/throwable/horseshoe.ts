import { defineWeapon, BLUNT, THROWABLE } from '../../helpers/index.js';

export const horseshoe = defineWeapon({
	internalId: 134,
	id: 'horseshoe',
	displayName: 'Horseshoe',
	description: 'A lucky chunk of iron that hits like a compact hammer when thrown with spite.',
	tags: [
	'lucky',
	'iron',
	'chunky',
],
	tier: 1,
	grip: 0,
	families: BLUNT | THROWABLE,
	qualityMultipliers: {
		weight: 0.9,
		speed: 0.96,
		edge: 0.66,
		reach: 0.76,
		curvature: 1.18,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
