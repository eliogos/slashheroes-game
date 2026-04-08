import { Weapon, WEAPON_FAMILY } from '../Weapon.js';
const { LEGENDARY, MISC, STAFF } = WEAPON_FAMILY;

export const legendaryWeapons = [
	new Weapon('monkey_staff')
		.setInternalId(89)
		.setDisplayName("Ruyi Jingu Bang")
		.setDescription("A mythic staff of impossible mastery, famous for overwhelming reach and power.")
		.setTags('mythic', 'sovereign', 'overwhelming')
		.setTier(6)
		.setGrip(2)
		.setFamilies(LEGENDARY | STAFF)
		.setWeightMod(1.18)
		.setSpeedMod(1.08)
		.setEdgeMod(1.06)
		.setReachMod(1.28)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),

	new Weapon('warfan')
		.setInternalId(99)
		.setDisplayName("Tessen")
		.setDescription("A Japanese war fan that hides iron ribs inside graceful folds for sudden blocks and disciplined strikes.")
		.setTags('graceful', 'hidden', 'poised')
		.setTier(6)
		.setGrip(1)
		.setFamilies(LEGENDARY | MISC)
		.setWeightMod(0.82)
		.setSpeedMod(1.2)
		.setEdgeMod(1.5)
		.setReachMod(0.88)
		.setCurvatureMod(1.22)
		.setCreatedAt('2026-03-26T13:50:55.126Z'),
];
