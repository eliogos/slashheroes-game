import { WEAPON_FAMILY } from '../helpers/constants.js';

export const HERO_CLASSES = [
	{
		id: 1,
		name: 'Warrior',
		emoji: '⚔️',
		summary: 'Brave, relentless, and mighty',
		description: 'Warriors are straightforward fighters who rely on strength and endurance. They have been trained to take hits and keep swinging, and most of them prefer it that way.',
		preferredStarterWeapons: ['shortsword', 'hatchet', 'club'],
		preferredWeaponFamilyId: WEAPON_FAMILY.BLADE,
		mods: { str: 3, agi: -1, sta: 0, wis: -2, int: -1, per: 0, luk: 0, hun: 0 }
	},
	{
		id: 2,
		name: 'Rogue',
		emoji: '🗡️',
		summary: 'Sneaky, agile, and cunning',
		description: 'Rogues operate in the space between seen and unseen. They are quick, opportunistic, and tend to avoid fair fights on principle.',
		preferredStarterWeapons: ['dagger', 'shortbow', 'sickle'],
		preferredWeaponFamilyId: WEAPON_FAMILY.KNIFE,
		mods: { str: 0, agi: 3, sta: 0, wis: -1, int: 0, per: 0, luk: 2, hun: -3 }
	},
	{
		id: 3,
		name: 'Mage',
		emoji: '🪄',
		summary: 'Wise, perceptive, and curious',
		description: 'Mages have spent years studying the arcane. They are fragile in a fight but can channel more magical force than just about anyone else.',
		preferredStarterWeapons: ['staff', 'umbrella', 'taser'],
		preferredWeaponFamilyId: WEAPON_FAMILY.STAFF,
		mods: { str: -1, agi: 0, sta: -1, wis: 4, int: 1, per: 2, luk: 1, hun: -4 }
	},
	{
		id: 4,
		name: 'Cleric',
		emoji: '⛪',
		summary: 'Faithful, steady, and protective',
		description: 'Clerics draw their power from devotion. They are not the strongest fighters, but they understand magic and healing in ways most classes never will.',
		preferredStarterWeapons: ['staff', 'club', 'buckler'],
		preferredWeaponFamilyId: WEAPON_FAMILY.STAFF,
		mods: { str: -1, agi: 0, sta: 0, wis: 2, int: 3, per: 1, luk: 0, hun: -5 }
	},
	{
		id: 5,
		name: 'Ranger',
		emoji: '🏹',
		summary: 'Sharp, patient, and precise',
		description: 'Rangers are hunters first. Comfortable in the wilderness and deadly at range, they are patient, observant, and rarely caught off guard.',
		preferredStarterWeapons: ['shortbow', 'spear', 'dagger'],
		preferredWeaponFamilyId: WEAPON_FAMILY.PROJECTILE,
		mods: { str: 0, agi: 2, sta: 0, wis: -1, int: 0, per: 0, luk: 2, hun: -2 }
	},
	{
		id: 6,
		name: 'Bard',
		emoji: '🎵',
		summary: 'Charming, inspiring, and clever',
		description: 'Bards travel, perform, and pick up a little of everything along the way. They are perceptive, socially sharp, and know more useful things than they probably should.',
		preferredStarterWeapons: ['ukulele', 'dagger', 'whip'],
		preferredWeaponFamilyId: WEAPON_FAMILY.MISC,
		mods: { str: 0, agi: 1, sta: 0, wis: 1, int: 0, per: 2, luk: 1, hun: -4 }
	},
	{
		id: 7,
		name: 'Paladin',
		emoji: '🛡️',
		summary: 'Honorable, fearless, and loyal',
		description: 'Paladins are warriors bound by a code. They are tough, capable in a fight, and have enough spiritual training to back it up with more than just steel.',
		preferredStarterWeapons: ['shortsword', 'club', 'buckler'],
		preferredWeaponFamilyId: WEAPON_FAMILY.SHIELD,
		mods: { str: 2, agi: 0, sta: 1, wis: -1, int: 2, per: -1, luk: 0, hun: -5 }
	},
	{
		id: 8,
		name: 'Monk',
		emoji: '🥋',
		summary: 'Focused, disciplined, and swift',
		description: 'Monks have trained their body to be the weapon. Years of discipline have made them fast and resilient, and they do not need much else.',
		preferredStarterWeapons: ['gloves', 'staff', 'jitte'],
		preferredWeaponFamilyId: WEAPON_FAMILY.FIST,
		mods: { str: 1, agi: 2, sta: 2, wis: -2, int: 0, per: -1, luk: 0, hun: -2 }
	}
];