import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const boomerang = defineWeapon({
	internalId: 114,
	id: 'boomerang',
	displayName: 'Boomerang',
	description: 'A curved throwing stick made to arc wide, clip targets, and sometimes swing back into your hand.',
	tags: [
	'curving',
	'arcing',
	'playful',
],
	tier: 1,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.84,
		speed: 1.08,
		edge: 0.92,
		reach: 1.18,
		curvature: 1.25,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
