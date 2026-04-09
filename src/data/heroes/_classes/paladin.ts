import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const paladin = defineHero({
	id: 7,
	name: 'Paladin',
	emoji: '🛡️',
	summary: 'Honorable, fearless, and loyal',
	description:
		'Paladins are warriors bound by a code. They are tough, capable in a fight, and have enough spiritual training to back it up with more than just steel.',
	preferredStarterWeapons: ['shortsword', 'club', 'buckler'],
	preferredWeaponFamilyId: WEAPON_FAMILY.SHIELD,
	mods: {
		str: 2,
		sta: 1,
		wis: -1,
		int: 2,
		per: -1,
		hun: -5,
	},
});
