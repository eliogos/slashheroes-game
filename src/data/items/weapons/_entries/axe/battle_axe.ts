import { defineWeapon, AXE } from '../../helpers/index.js';

export const battle_axe = defineWeapon({
	internalId: 61,
	id: 'battle_axe',
	displayName: 'Battle Axe',
	description: 'A war-ready axe with broad chopping power and confident handling.',
	tags: [
	'martial',
	'broad',
	'forceful',
],
	tier: 4,
	grip: 1,
	families: AXE,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.96,
		edge: 1.05,
		reach: 1.02,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
