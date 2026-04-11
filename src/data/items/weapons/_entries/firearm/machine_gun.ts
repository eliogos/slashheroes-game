import { defineWeapon, FIREARM } from '../../helpers/index.js';

export const machine_gun = defineWeapon({
	internalId: 84,
	id: 'machine_gun',
	display: {
			en: {
				name: 'Machine Gun',
				description: 'A rapid-fire heavy weapon that overwhelms targets through relentless output.',
			},
		},
	tier: 6,
	grip: 2,
	families: FIREARM,
	qualityMultipliers: {
		weight: 1.24,
		speed: 1.06,
		reach: 1.08,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
