import { defineWeapon, BLADE } from '../../helpers/index.js';

export const saw = defineWeapon({
	internalId: 10,
	id: 'saw',
	displayName: 'Saw',
	description: 'A jagged hand weapon that tears flesh open with every dragging cut.',
	tags: [
	'jagged',
	'ragged',
	'vicious',
],
	tier: 2,
	grip: 1,
	families: BLADE,
	qualityMultipliers: {
		weight: 1.05,
		speed: 0.96,
		edge: 1.08,
		reach: 0.96,
		curvature: 0.7,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
