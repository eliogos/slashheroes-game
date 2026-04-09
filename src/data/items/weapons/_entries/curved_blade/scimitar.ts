import { defineWeapon, CURVED_BLADE } from '../../helpers/index.js';

export const scimitar = defineWeapon({
	internalId: 25,
	id: 'scimitar',
	displayName: 'Scimitar',
	description: 'A deeply curved sword designed for flowing cuts and confident follow-through.',
	tags: [
	'flowing',
	'elegant',
	'keen',
],
	tier: 4,
	grip: 1,
	families: CURVED_BLADE,
	qualityMultipliers: {
		weight: 0.97,
		speed: 1.04,
		edge: 1.06,
		reach: 1.03,
		curvature: 1.3,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
