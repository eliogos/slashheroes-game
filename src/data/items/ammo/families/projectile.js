import { Ammo, WEAPON_FAMILY } from '../AmmoItem.js';
const { FIREARM, PROJECTILE } = WEAPON_FAMILY;

export const projectileAmmo = [
	new Ammo('pellet')
		.setInternalId(1)
		.setDisplayName('Pellet')
		.setDescription('A generic impact round shared by slings, slingshots, and crude cannons, with each weapon amplifying the shot differently.')
		.setTags('generic', 'compact', 'impact')
		.setWeight(180)
		.setCompatibleFamilies(PROJECTILE | FIREARM)
		.setWeaponAmplifiers({
			sling: 1,
			slingshot: 0.92,
			handcannon: 1.55
		})
		.setCreatedAt('2026-03-26T14:55:00.000Z'),

	new Ammo('arrow')
		.setInternalId(2)
		.setDisplayName('Arrow')
		.setDescription('A fletched projectile tuned for bows, balancing low mass with clean puncturing flight.')
		.setTags('fletched', 'piercing', 'steady')
		.setWeight(45)
		.setCompatibleFamilies(PROJECTILE)
		.setWeaponAmplifiers({
			shortbow: 1,
			longbow: 1.12,
			recurve_bow: 1.19,
			composite_bow: 1.4
		})
		.setCreatedAt('2026-03-26T14:55:00.000Z'),
];
