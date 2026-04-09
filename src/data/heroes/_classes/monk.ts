import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const monk = defineHero({
	id: 8,
	name: 'Monk',
	emoji: '🥋',
	summary: 'Focused, disciplined, and swift',
	description:
		'Monks have trained their body to be the weapon. Years of discipline have made them fast and resilient, and they do not need much else.',
	preferredStarterWeapons: ['gloves', 'staff', 'fork_baton'],
	preferredWeaponFamilyId: WEAPON_FAMILY.FIST,
	mods: {
		str: 1,
		agi: 2,
		sta: 2,
		wis: -2,
		per: -1,
		hun: -2,
	},
});
