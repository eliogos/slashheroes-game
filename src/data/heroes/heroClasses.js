import { WEAPON_FAMILY } from '../helpers/constants.js';

export const HERO_CLASSES = [
	{
		id: 1,
		name: 'Warrior',
		emoji: '⚔️',
		summary: 'Brave, relentless, and mighty',
		preferredStarterWeapons: ['shortsword', 'hatchet', 'club'],
		preferredWeaponFamilyId: WEAPON_FAMILY.BLADE,
		mods: { str: 3, agi: -1, sta: 0, hp: 1, wis: -2, int: -1, per: 0, luk: 0, hun: 0 }
	},
	{
		id: 2,
		name: 'Rogue',
		emoji: '🗡️',
		summary: 'Sneaky, agile, and cunning',
		preferredStarterWeapons: ['dagger', 'shortbow', 'sickle'],
		preferredWeaponFamilyId: WEAPON_FAMILY.KNIFE,
		mods: { str: 0, agi: 3, sta: 0, hp: -1, wis: -1, int: 0, per: 0, luk: 2, hun: -3 }
	},
	{
		id: 3,
		name: 'Mage',
		emoji: '🪄',
		summary: 'Wise, perceptive, and curious',
		preferredStarterWeapons: ['staff'],
		preferredWeaponFamilyId: WEAPON_FAMILY.STAFF,
		mods: { str: -1, agi: 0, sta: -1, hp: -2, wis: 4, int: 1, per: 2, luk: 1, hun: -4 }
	},
	{
		id: 4,
		name: 'Cleric',
		emoji: '⛪',
		summary: 'Faithful, steady, and protective',
		preferredStarterWeapons: ['staff', 'club', 'buckler'],
		preferredWeaponFamilyId: WEAPON_FAMILY.STAFF,
		mods: { str: -1, agi: 0, sta: 0, hp: 0, wis: 2, int: 3, per: 1, luk: 0, hun: -5 }
	},
	{
		id: 5,
		name: 'Ranger',
		emoji: '🏹',
		summary: 'Sharp, patient, and precise',
		preferredStarterWeapons: ['shortbow', 'spear', 'dagger'],
		preferredWeaponFamilyId: WEAPON_FAMILY.PROJECTILE,
		mods: { str: 0, agi: 2, sta: 0, hp: -1, wis: -1, int: 0, per: 0, luk: 2, hun: -2 }
	},
	{
		id: 6,
		name: 'Bard',
		emoji: '🎵',
		summary: 'Charming, inspiring, and clever',
		preferredStarterWeapons: ['ukulele', 'dagger', 'whip'],
		preferredWeaponFamilyId: WEAPON_FAMILY.MISC,
		mods: { str: 0, agi: 1, sta: 0, hp: -1, wis: 1, int: 0, per: 2, luk: 1, hun: -4 }
	},
	{
		id: 7,
		name: 'Paladin',
		emoji: '🛡️',
		summary: 'Honorable, fearless, and loyal',
		preferredStarterWeapons: ['shortsword', 'club', 'buckler'],
		preferredWeaponFamilyId: WEAPON_FAMILY.BLUNT,
		mods: { str: 2, agi: 0, sta: 1, hp: 2, wis: -1, int: 2, per: -1, luk: 0, hun: -5 }
	},
	{
		id: 8,
		name: 'Monk',
		emoji: '🥋',
		summary: 'Focused, disciplined, and swift',
		preferredStarterWeapons: ['gloves', 'staff'],
		preferredWeaponFamilyId: WEAPON_FAMILY.FIST,
		mods: { str: 1, agi: 2, sta: 2, hp: 0, wis: -2, int: 0, per: -1, luk: 0, hun: -2 }
	}
];
