import { Weapon, WEAPON_FAMILY } from '../Weapon.js';
const { MISC } = WEAPON_FAMILY;

export const miscWeapons = [
	new Weapon('fork_baton')
		.setInternalId(96)
		.setDisplayName("Jitte")
		.setDescription("A short iron weapon built for catching attacks and punishing openings.")
		.setTags('vigilant', 'hooked', 'tactical')
		.setTier(1)
		.setGrip(1)
		.setFamilies(MISC)
		.setWeightMod(0.92)
		.setEdgeMod(0.96)
		.setReachMod(0.78)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),

	new Weapon('scissors')
		.setInternalId(97)
		.setDisplayName("Scissors")
		.setDescription("A cutting tool that becomes surprisingly nasty once used with intent.")
		.setTags('domestic', 'snippy', 'awkward')
		.setTier(1)
		.setGrip(1)
		.setFamilies(MISC)
		.setWeightMod(0.74)
		.setSpeedMod(1.05)
		.setEdgeMod(1.04)
		.setReachMod(0.58)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),

	new Weapon('great_scissors')
		.setInternalId(98)
		.setDisplayName("Great Scissors")
		.setDescription("An absurd oversized cutting tool turned into a ridiculous but dangerous showpiece.")
		.setTags('absurd', 'theatrical', 'savage')
		.setTier(6)
		.setGrip(2)
		.setFamilies(MISC)
		.setWeightMod(1.35)
		.setSpeedMod(0.82)
		.setEdgeMod(1.28)
		.setReachMod(1.08)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),

	new Weapon('ukulele')
		.setInternalId(109)
		.setDisplayName("Ukulele")
		.setDescription("A bard's cheerful little instrument that can charm a crowd or crack a skull in a pinch.")
		.setTags('cheerful', 'melodic', 'nimble')
		.setTier(1)
		.setGrip(1)
		.setFamilies(MISC)
		.setWeightMod(0.82)
		.setSpeedMod(1.05)
		.setEdgeMod(0.76)
		.setReachMod(0.8)
		.setCurvatureMod(1.15)
		.setCreatedAt('2026-03-26T14:07:45.113Z'),
];
