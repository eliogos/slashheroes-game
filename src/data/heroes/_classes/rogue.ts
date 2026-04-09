import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const rogue = defineHero({
	id: 2,
	name: 'Rogue',
	emoji: '🗡️',
	summary: 'Sneaky, agile, and cunning',
	description:
		'Rogues operate in the space between seen and unseen. They are quick, opportunistic, and tend to avoid fair fights on principle.',
	preferredStarterWeapons: ['dagger', 'shortbow', 'sickle'],
	preferredWeaponFamilyId: WEAPON_FAMILY.KNIFE,
	mods: {
		agi: 3,
		wis: -1,
		luk: 2,
		hun: -3,
	},
});
