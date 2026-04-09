import { defineWeapon, KNIFE } from '../../helpers/index.js';

export const stiletto = defineWeapon({
	internalId: 3,
	id: 'stiletto',
	displayName: 'Stiletto',
	description: 'A narrow dueling blade designed for precise punctures and clean finishers.',
	tags: [
	'elegant',
	'sinister',
	'precise',
],
	tier: 3,
	grip: 1,
	families: KNIFE,
	qualityMultipliers: {
		weight: 0.96,
		speed: 1.04,
		edge: 1.05,
		reach: 1.02,
		curvature: 2,
	},
	created_at: '2026-03-26T13:22:44.000Z',
});
