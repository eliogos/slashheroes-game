import { defineWeapon, CURVED_BLADE } from '../../helpers/index.js';

export const cutlass = defineWeapon({
	internalId: 23,
	id: 'cutlass',
	displayName: 'Cutlass',
	description: 'A naval sidearm tuned for compact swings in cramped decks and brawls.',
	tags: [
	'briny',
	'agile',
	'rowdy',
],
	tier: 3,
	grip: 1,
	families: CURVED_BLADE,
	qualityMultipliers: {
		weight: 0.95,
		speed: 1.05,
		edge: 1.02,
		reach: 0.96,
		curvature: 1.2,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
