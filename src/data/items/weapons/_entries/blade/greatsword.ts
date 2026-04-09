import { defineWeapon, BLADE } from '../../helpers/index.js';

export const greatsword = defineWeapon({
	internalId: 15,
	id: 'greatsword',
	displayName: 'Greatsword',
	description: 'A heavy two-handed blade that delivers punishing strikes with fully committed swings.',
	tags: [
	'towering',
	'punishing',
	'relentless',
],
	tier: 5,
	grip: 2,
	families: BLADE,
	qualityMultipliers: {
		weight: 1.18,
		speed: 0.89,
		edge: 1.05,
		reach: 1.16,
		curvature: 0.9,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
