import { Weapon, WEAPON_FAMILY } from '../Weapon.js';
const { RANGED } = WEAPON_FAMILY;

export const rangedWeapons = [
	new Weapon('whip')
		.setInternalId(92)
		.setDisplayName("Whip")
		.setDescription("A flexible long-range weapon that punishes spacing and timing mistakes.")
		.setTags('flexible', 'snaring', 'stinging')
		.setTier(1)
		.setGrip(1)
		.setFamilies(RANGED)
		.setWeightMod(0.76)
		.setSpeedMod(1.08)
		.setEdgeMod(0.98)
		.setReachMod(1.18)
		.setCurvatureMod(1.18)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),
];
