import { Weapon, WEAPON_FAMILY } from '../Weapon.js';
const { STAFF } = WEAPON_FAMILY;

export const staffWeapons = [
	new Weapon('staff')
		.setInternalId(85)
		.setDisplayName("Staff")
		.setDescription("A simple wooden pole with plain handling and dependable length.")
		.setTags('plain', 'wooden', 'steady')
		.setTier(1)
		.setGrip(1)
		.setFamilies(STAFF)
		.setWeightMod(0.9)
		.setEdgeMod(0.95)
		.setReachMod(0.96)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),

	new Weapon('quarterstaff')
		.setInternalId(86)
		.setDisplayName("Quarterstaff")
		.setDescription("A reinforced combat staff built for disciplined spins and measured strikes.")
		.setTags('disciplined', 'reinforced', 'measured')
		.setTier(2)
		.setGrip(1)
		.setFamilies(STAFF)
		.setSpeedMod(1.02)
		.setEdgeMod(0.96)
		.setReachMod(1.04)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),

	new Weapon('scepter')
		.setInternalId(87)
		.setDisplayName("Scepter")
		.setDescription("A ceremonial rod that carries authority and surprising close-range menace.")
		.setTags('ceremonial', 'regal', 'poised')
		.setTier(4)
		.setGrip(1)
		.setFamilies(STAFF)
		.setWeightMod(0.82)
		.setSpeedMod(1.06)
		.setEdgeMod(1.02)
		.setReachMod(0.82)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),

	new Weapon('war_staff')
		.setInternalId(88)
		.setDisplayName("War Staff")
		.setDescription("A combat-optimized staff hardened for forceful sweeps and stubborn defense.")
		.setTags('hardened', 'forceful', 'disciplined')
		.setTier(5)
		.setGrip(1)
		.setFamilies(STAFF)
		.setWeightMod(1.12)
		.setSpeedMod(0.98)
		.setEdgeMod(1.04)
		.setReachMod(1.12)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),
];
