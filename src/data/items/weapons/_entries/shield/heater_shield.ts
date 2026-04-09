import { defineWeapon, SHIELD } from '../../helpers/index.js';

export const heater_shield = defineWeapon({
	internalId: 104,
	id: 'heater_shield',
	displayName: 'Heater Shield',
	description: 'A medium shield shaped for dependable coverage and practical front-line work.',
	tags: [
	'practical',
	'protective',
	'solid',
],
	tier: 3,
	grip: 1,
	families: SHIELD,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.94,
		edge: 0.9,
		reach: 0.94,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
