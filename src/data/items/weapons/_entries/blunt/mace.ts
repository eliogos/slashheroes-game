import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const mace = defineWeapon({
	internalId: 38,
	id: 'mace',
	displayName: 'Mace',
	description: 'A spiked striking weapon that concentrates force into armored targets.',
	tags: [
	'spiked',
	'martial',
	'punishing',
],
	tier: 3,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		speed: 0.98,
		edge: 1.08,
		reach: 0.92,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
