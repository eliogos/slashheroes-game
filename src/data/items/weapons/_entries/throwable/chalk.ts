import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const chalk = defineWeapon({
	internalId: 136,
	id: 'chalk',
	displayName: 'Chalk',
	description: 'A dusty little classroom missile, just like the old school days except now it technically counts as a weapon.',
	tags: [
	'dusty',
	'petty',
	'nostalgic',
],
	tier: 1,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.18,
		speed: 1.28,
		edge: 0.42,
		reach: 0.62,
		curvature: 0.9,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
