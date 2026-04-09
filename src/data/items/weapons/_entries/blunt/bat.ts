import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const bat = defineWeapon({
	internalId: 30,
	id: 'bat',
	displayName: 'Bat',
	description: 'A light swingable stick that favors tempo over raw crushing power.',
	tags: [
	'sporty',
	'lively',
	'balanced',
],
	tier: 1,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 0.88,
		speed: 1.07,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
