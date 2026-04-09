import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const ranger = defineHero({
	id: 5,
	name: 'Ranger',
	emoji: '🏹',
	summary: 'Sharp, patient, and precise',
	description:
		'Rangers are hunters first. Comfortable in the wilderness and deadly at range, they are patient, observant, and rarely caught off guard.',
	preferredStarterWeapons: ['shortbow', 'spear', 'dagger'],
	preferredWeaponFamilyId: WEAPON_FAMILY.PROJECTILE,
	mods: {
		agi: 2,
		wis: -1,
		luk: 2,
		hun: -2,
	},
});
