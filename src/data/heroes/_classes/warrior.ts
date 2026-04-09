import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const warrior = defineHero({
	id: 1,
	name: 'Warrior',
	emoji: '⚔️',
	summary: 'Brave, relentless, and mighty',
	description:
		'Warriors are straightforward fighters who rely on strength and endurance. They have been trained to take hits and keep swinging, and most of them prefer it that way.',
	preferredStarterWeapons: ['shortsword', 'hatchet', 'club'],
	preferredWeaponFamilyId: WEAPON_FAMILY.BLADE,
	mods: {
		str: 3,
		agi: -1,
		wis: -2,
		int: -1,
	},
});
