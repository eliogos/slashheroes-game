import { defineWeapon, POLEARM } from '../../helpers/index.js';

export const spear = defineWeapon({
	internalId: 49,
	id: 'spear',
	displayName: 'Spear',
	description: 'A classic thrusting weapon with reliable reach and clean linear attacks.',
	tags: [
	'classic',
	'balanced',
	'disciplined',
],
	tier: 1,
	grip: 1,
	families: POLEARM,
	qualityMultipliers: {
		weight: 0.94,
		speed: 1.02,
		edge: 1.05,
		reach: 1.02,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
