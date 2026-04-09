import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const smokeGrenade = defineWeapon({
	internalId: 121,
	id: 'smokeGrenade',
	displayName: 'Smoke Grenade',
	description: 'A canister that trades raw blast for choking cover, confusion, and a filthy cloud of breathing problems.',
	tags: [
	'clouding',
	'obscuring',
	'dirty',
],
	tier: 3,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.76,
		speed: 1.02,
		edge: 0.7,
		reach: 0.82,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
