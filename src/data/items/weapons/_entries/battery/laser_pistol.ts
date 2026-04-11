import { defineWeapon, BATTERY, FIREARM } from '../../helpers/index.js';

export const laser_pistol = defineWeapon({
	internalId: 80,
	id: 'laser_pistol',
	display: {
			en: {
				name: 'Laser Pistol',
				description: 'A battery-fed sidearm that fires clean energy with crisp modern precision.',
			},
		},
	tier: 4,
	grip: 1,
	families: BATTERY | FIREARM,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.12,
		edge: 1.05,
		reach: 0.98,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
