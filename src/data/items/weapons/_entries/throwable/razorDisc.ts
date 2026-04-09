import { defineWeapon, CURVED_BLADE, THROWABLE } from '../../helpers/index.js';

export const razorDisc = defineWeapon({
	internalId: 131,
	id: 'razorDisc',
	displayName: 'Razor Disc',
	description: 'A vicious spinning disc edged for surgical cuts and thrown for maximum overkill.',
	tags: [
	'spinning',
	'surgical',
	'vicious',
],
	tier: 5,
	grip: 0,
	families: CURVED_BLADE | THROWABLE,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.14,
		edge: 1.16,
		reach: 1.02,
		curvature: 1.28,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
