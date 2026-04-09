import { defineWeapon, AXE, TOOL } from '../../helpers/index.js';

export const pickaxe = defineWeapon({
	internalId: 60,
	id: 'pickaxe',
	displayName: 'Pickaxe',
	description: 'A mining tool adapted for combat that punctures with nasty concentrated force.',
	tags: [
	'mining',
	'stubborn',
	'puncturing',
],
	tier: 3,
	grip: 1,
	families: AXE | TOOL,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.9,
		edge: 1.12,
		reach: 0.92,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
