import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const longbow = defineWeapon({
	internalId: 69,
	id: 'longbow',
	displayName: 'Longbow',
	description: 'A tall bow built for far-reaching shots and disciplined volleys.',
	tags: [
	'tall',
	'patient',
	'disciplined',
],
	tier: 4,
	grip: 2,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 1.04,
		speed: 0.96,
		reach: 1.18,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
