import { defineWeapon, POLEARM } from '../../helpers/index.js';

export const pike = defineWeapon({
	internalId: 50,
	id: 'pike',
	displayName: 'Pike',
	description: 'A very long infantry weapon built to keep danger several steps away.',
	tags: [
	'lengthy',
	'rigid',
	'defensive',
],
	tier: 2,
	grip: 1,
	families: POLEARM,
	qualityMultipliers: {
		weight: 1.02,
		speed: 0.91,
		edge: 1.01,
		reach: 1.24,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
