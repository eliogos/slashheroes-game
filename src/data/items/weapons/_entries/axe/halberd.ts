import { defineWeapon, AXE, POLEARM } from '../../helpers/index.js';

export const halberd = defineWeapon({
	internalId: 56,
	id: 'halberd',
	displayName: 'Halberd',
	description: 'A battlefield poleaxe combining reach, hooking control, and crushing finish.',
	tags: [
	'disciplined',
	'fearsome',
	'commanding',
],
	tier: 6,
	grip: 2,
	families: AXE | POLEARM,
	qualityMultipliers: {
		weight: 1.14,
		speed: 0.9,
		edge: 1.08,
		reach: 1.24,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
