import { defineWeapon, AXE } from '../../helpers/index.js';

export const hand_axe = defineWeapon({
	internalId: 59,
	id: 'hand_axe',
	displayName: 'Hand Axe',
	description: 'A light versatile axe that balances utility with honest combat bite.',
	tags: [
	'versatile',
	'sturdy',
	'honest',
],
	tier: 2,
	grip: 1,
	families: AXE,
	qualityMultipliers: {
		weight: 0.96,
		speed: 1.04,
		edge: 1.03,
		reach: 0.86,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
