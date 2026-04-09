import { defineWeapon, SHIELD } from '../../helpers/index.js';

export const targe = defineWeapon({
	internalId: 103,
	id: 'targe',
	displayName: 'Targe',
	description: 'A sturdy small shield that favors rugged control over raw size.',
	tags: [
	'rugged',
	'compact',
	'resolute',
],
	tier: 3,
	grip: 1,
	families: SHIELD,
	qualityMultipliers: {
		weight: 1.02,
		speed: 0.98,
		edge: 0.92,
		reach: 0.82,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
