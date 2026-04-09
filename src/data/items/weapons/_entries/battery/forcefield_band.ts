import { defineWeapon, BATTERY, SHIELD } from '../../helpers/index.js';

export const forcefield_band = defineWeapon({
	internalId: 105,
	id: 'forcefield_band',
	displayName: 'Forcefield Band',
	description: 'An armband projector that spins battery power into a portable barrier.',
	tags: [
	'projected',
	'sleek',
	'defensive',
],
	tier: 4,
	grip: 1,
	families: BATTERY | SHIELD,
	qualityMultipliers: {
		weight: 0.58,
		speed: 1.14,
		edge: 0.88,
		reach: 0.62,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
