import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const grenade = defineWeapon({
	internalId: 120,
	id: 'grenade',
	displayName: 'Grenade',
	description: 'A compact explosive that turns a short throw into a sharp burst of shrapnel and panic.',
	tags: [
	'compact',
	'fragmenting',
	'military',
],
	tier: 3,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.88,
		speed: 1,
		edge: 0.9,
		reach: 0.84,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
