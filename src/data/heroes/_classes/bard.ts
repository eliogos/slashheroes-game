import { WEAPON_FAMILY } from '../../helpers/constants.js';
import { defineHero } from '../helpers/defineHero.js';

export const bard = defineHero({
	id: 6,
	name: 'Bard',
	emoji: '🎻',
	summary: 'Charming, inspiring, and clever',
	description:
		'Bards travel, perform, and pick up a little of everything along the way. They are perceptive, socially sharp, and know more useful things than they probably should.',
	preferredStarterWeapons: ['ukulele', 'dagger', 'whip'],
	preferredWeaponFamilyId: WEAPON_FAMILY.MISC,
	mods: {
		agi: 1,
		wis: 1,
		per: 2,
		luk: 1,
		hun: -4,
	},
});
