import { defineWeapon, POLEARM, RANGED } from '../../helpers/index.js';

export const harpoon = defineWeapon({
	internalId: 52,
	id: 'harpoon',
	displayName: 'Harpoon',
	description: 'A barbed hunting spear suited for long thrusts and thrown follow-ups.',
	tags: [
	'barbed',
	'maritime',
	'hunting',
],
	tier: 3,
	grip: 1,
	families: POLEARM | RANGED,
	qualityMultipliers: {
		weight: 1.03,
		speed: 0.96,
		edge: 1.06,
		reach: 1.12,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
