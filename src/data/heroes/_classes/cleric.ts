import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const cleric = defineHero({
	id: 4,
	name: 'Cleric',
	emoji: '⛪',
	summary: 'Faithful, steady, and protective',
	description:
		'Clerics draw their power from devotion. They are not the strongest fighters, but they understand magic and healing in ways most classes never will.',
	preferredStarterWeapons: ['staff', 'club', 'buckler'],
	preferredWeaponFamilyId: WEAPON_FAMILY.STAFF,
	mods: {
		str: -1,
		wis: 2,
		int: 3,
		per: 1,
		hun: -5,
	},
});
