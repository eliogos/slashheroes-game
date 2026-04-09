import { defineWeapon, SHIELD } from '../../helpers/index.js';

export const scutum = defineWeapon({
	internalId: 107,
	id: 'scutum',
	displayName: 'Scutum',
	description: 'A Roman-style shield that dominates space through size and disciplined coverage.',
	tags: [
	'roman',
	'disciplined',
	'imposing',
],
	tier: 5,
	grip: 1,
	families: SHIELD,
	qualityMultipliers: {
		weight: 1.18,
		speed: 0.86,
		edge: 0.9,
		reach: 0.96,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
