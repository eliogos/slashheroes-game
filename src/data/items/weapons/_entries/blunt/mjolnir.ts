import { defineWeapon, BLUNT, LEGENDARY } from '../../helpers/index.js';

export const mjolnir = defineWeapon({
	internalId: 46,
	id: 'mjolnir',
	displayName: 'Mjölnir',
	description: 'A legendary hammer of impossible density, minus the thunder but not the impact.',
	tags: [
	'mythic',
	'divine',
	'compact',
],
	tier: 6,
	grip: 1,
	families: BLUNT | LEGENDARY,
	qualityMultipliers: {
		weight: 1.08,
		speed: 1.02,
		edge: 1.1,
		reach: 0.86,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
