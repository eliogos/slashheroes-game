import { defineWeapon, BATTERY, BLUNT, FIST } from '../../helpers/index.js';

export const mecha_mitt = defineWeapon({
	internalId: 117,
	id: 'mecha_mitt',
	displayName: 'Mecha-mitt',
	description: 'A battery-driven impact gauntlet that charges up between swings and releases the energy as a devastating piston strike.',
	tags: [
	'powered',
	'mechanical',
	'hammering',
],
	tier: 4,
	grip: 1,
	families: BATTERY | BLUNT | FIST,
	qualityMultipliers: {
		weight: 1.14,
		speed: 1.02,
		edge: 1.1,
		reach: 0.88,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
