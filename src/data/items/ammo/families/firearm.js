import { Ammo, WEAPON_FAMILY } from '../AmmoItem.js';
const { FIREARM } = WEAPON_FAMILY;

export const firearmAmmo = [
	new Ammo('bullet')
		.setInternalId(4)
		.setDisplayName('Bullet')
		.setDescription('A generalized firearm round meant to cover most guns before you split calibers into their own entries.')
		.setTags('metal', 'compact', 'ballistic')
		.setWeight(12)
		.setCompatibleFamilies(FIREARM)
		.setWeaponAmplifiers({
			flintlock: 0.95,
			musket: 1.04,
			rifle: 1.12,
			machine_gun: 1.28
		})
		.setCreatedAt('2026-03-26T14:55:00.000Z'),

	new Ammo('rocket')
		.setInternalId(5)
		.setDisplayName('Rocket')
		.setDescription('A self-propelled explosive round built for launchers that turn one shot into a very bad day.')
		.setTags('propelled', 'explosive', 'heavy')
		.setWeight(2100)
		.setCompatibleFamilies(FIREARM)
		.setWeaponAmplifiers({
			bazooka: 1.28
		})
		.setCreatedAt('2026-03-26T15:34:00.000Z'),
];
