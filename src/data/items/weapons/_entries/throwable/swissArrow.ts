import { defineWeapon, MISC, POLEARM, THROWABLE } from '../../helpers/index.js';

export const swissArrow = defineWeapon({
	internalId: 127,
	id: 'swissArrow',
	displayName: 'Swiss Arrow',
	description: 'A hand-thrown dart with fletching and a corded launch trick that gives it far more reach than it should have.',
	tags: [
	'corded',
	'fletched',
	'clever',
],
	tier: 2,
	grip: 0,
	families: MISC | POLEARM | THROWABLE,
	qualityMultipliers: {
		weight: 0.68,
		speed: 1.14,
		edge: 1.08,
		reach: 1.08,
		curvature: 0.85,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
