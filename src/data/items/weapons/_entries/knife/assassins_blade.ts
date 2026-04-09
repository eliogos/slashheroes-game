import { defineWeapon, KNIFE } from '../../helpers/index.js';

export const assassins_blade = defineWeapon({
	internalId: 7,
	id: 'assassins_blade',
	displayName: 'Assassin\'s Blade',
	description: 'A masterwork knife reserved for lethal specialists and silent executions.',
	tags: [
	'elite',
	'ruthless',
	'shadowed',
],
	tier: 6,
	grip: 1,
	families: KNIFE,
	qualityMultipliers: {
		weight: 1.02,
		speed: 1.03,
		edge: 1.05,
		reach: 1.06,
	},
	created_at: '2026-03-26T13:22:44.000Z',
});
