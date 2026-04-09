import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const mage = defineHero({
	id: 3,
	name: 'Mage',
	emoji: '🪄',
	summary: 'Wise, perceptive, and curious',
	description:
		'Mages have spent years studying the arcane. They are fragile in a fight but can channel more magical force than just about anyone else.',
	preferredStarterWeapons: ['staff', 'umbrella', 'taser'],
	preferredWeaponFamilyId: WEAPON_FAMILY.STAFF,
	mods: {
		str: -1,
		sta: -1,
		wis: 4,
		int: 1,
		per: 2,
		luk: 1,
		hun: -4,
	},
});
