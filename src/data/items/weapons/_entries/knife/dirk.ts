import { defineWeapon, KNIFE } from '../../helpers/index.js';

export const dirk = defineWeapon({
	internalId: 2,
	id: 'dirk',
	displayName: 'Dirk',
	description: 'A reinforced thrusting knife favored for disciplined one-handed fighting.',
	tags: [
	'formal',
	'sturdy',
	'disciplined',
],
	tier: 2,
	grip: 1,
	families: KNIFE,
	qualityMultipliers: {
		weight: 1.01,
		edge: 1.02,
		reach: 1.01,
	},
	created_at: '2026-03-26T13:22:44.000Z',
});
