import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const slingshot = defineWeapon({
	internalId: 66,
	id: 'slingshot',
	displayName: 'Slingshot',
	description: 'A small elastic launcher suited for quick shots and cheap ammunition.',
	tags: [
	'elastic',
	'playful',
	'snappy',
],
	tier: 2,
	grip: 2,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 0.66,
		speed: 1.08,
		reach: 0.74,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
