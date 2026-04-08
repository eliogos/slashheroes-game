import { Ammo, WEAPON_FAMILY } from '../AmmoItem.js';
const { BATTERY } = WEAPON_FAMILY;

export const batteryAmmo = [
	new Ammo('battery')
		.setInternalId(3)
		.setDisplayName('Battery')
		.setDescription('A generic charge cell that feeds powered weapons and scales with how efficiently they convert stored energy.')
		.setTags('charged', 'stored', 'volatile')
		.setWeight(120)
		.setCompatibleFamilies(BATTERY)
		.setWeaponAmplifiers({
			taser: 0.95,
			electric_baton: 1.05,
			electric_whip: 1.08,
			electric_guitar: 1.1,
			electric_racket: 1,
			lightsabre: 1.5
		})
		.setCreatedAt('2026-03-26T14:55:00.000Z'),
];
