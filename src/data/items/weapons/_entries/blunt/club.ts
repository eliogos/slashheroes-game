import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const club = defineWeapon({
	internalId: 29,
	id: 'club',
	displayName: 'Club',
	description: 'A plain wooden club that solves problems with uncomplicated force.',
	tags: [
	'plain',
	'crude',
	'reliable',
],
	tier: 1,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 0.94,
		speed: 1.01,
		reach: 0.9,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
