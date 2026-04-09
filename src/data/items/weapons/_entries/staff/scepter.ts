import { defineWeapon, STAFF } from '../../helpers/index.js';

export const scepter = defineWeapon({
	internalId: 87,
	id: 'scepter',
	displayName: 'Scepter',
	description: 'A ceremonial rod that carries authority and surprising close-range menace.',
	tags: [
	'ceremonial',
	'regal',
	'poised',
],
	tier: 4,
	grip: 1,
	families: STAFF,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.06,
		edge: 1.02,
		reach: 0.82,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
