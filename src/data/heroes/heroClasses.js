import { WEAPON_FAMILY } from '../helpers/constants.js';

const DEFAULT_MODIFIERS = Object.freeze({
	str: 0,
	agi: 0,
	sta: 0,
	hp: 0,
	mp: 0,
	wis: 0,
	int: 0,
	per: 0,
	luk: 0,
	hun: 0
});

const MODIFIER_KEY_MAP = Object.freeze({
	str: 'str',
	strength: 'str',
	agi: 'agi',
	agility: 'agi',
	sta: 'sta',
	stamina: 'sta',
	hp: 'hp',
	health: 'hp',
	mp: 'mp',
	mana: 'mp',
	wis: 'wis',
	wisdom: 'wis',
	int: 'int',
	intelligence: 'int',
	per: 'per',
	perception: 'per',
	luk: 'luk',
	luck: 'luk',
	hun: 'hun',
	hunger: 'hun'
});

export class HeroDefinition {
	constructor(id) {
		this.id = id;
		this.name = '';
		this.emoji = '';
		this.summary = '';
		this.description = '';
		this.mods = { ...DEFAULT_MODIFIERS };
	}

	setName(value) { this.name = value; return this; }
	setEmoji(value) { this.emoji = value; return this; }
	setSummary(value) { this.summary = value; return this; }
	setDescription(value) { this.description = value; return this; }

	get modifiers() { return this; }

	clearModifiers() {
		this.mods = { ...DEFAULT_MODIFIERS };
		return this;
	}

	withModifiers(value = {}) {
		for (const [key, amount] of Object.entries(value)) {
			const normalizedKey = MODIFIER_KEY_MAP[String(key).toLowerCase()];
			if (normalizedKey) {
				this.mods[normalizedKey] = amount;
			}
		}
		return this;
	}

	setModifiers(value = {}) { return this.withModifiers(value); }

	setModifier(key, value) {
		const normalizedKey = MODIFIER_KEY_MAP[String(key).toLowerCase()] ?? key;
		if (normalizedKey in DEFAULT_MODIFIERS) {
			this.mods[normalizedKey] = value;
		}
		return this;
	}

	strength(value) { return this.setModifier('str', value); }
	agility(value) { return this.setModifier('agi', value); }
	stamina(value) { return this.setModifier('sta', value); }
	health(value) { return this.setModifier('hp', value); }
	mana(value) { return this.setModifier('mp', value); }
	wisdom(value) { return this.setModifier('wis', value); }
	intelligence(value) { return this.setModifier('int', value); }
	perception(value) { return this.setModifier('per', value); }
	luck(value) { return this.setModifier('luk', value); }
	hunger(value) { return this.setModifier('hun', value); }
}

export class HeroClass extends HeroDefinition {
	constructor(id) {
		super(id);
		this.preferredStarterWeapons = [];
		this.preferredWeaponFamilyId = null;
	}

	setPreferredStarterWeapons(...values) {
		this.preferredStarterWeapons = values.flat();
		return this;
	}

	setPreferredWeaponFamilyId(value) {
		this.preferredWeaponFamilyId = value;
		return this;
	}
}

export const HERO_CLASSES = [
	new HeroClass(1)
		.setName('Warrior')
		.setEmoji('⚔️')
		.setSummary('Brave, relentless, and mighty')
		.setDescription('Warriors are straightforward fighters who rely on strength and endurance. They have been trained to take hits and keep swinging, and most of them prefer it that way.')
		.setPreferredStarterWeapons('shortsword', 'hatchet', 'club')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.BLADE)
		.modifiers
		.strength(3)
		.agility(-1)
		.stamina(0)
		.wisdom(-2)
		.intelligence(-1)
		.perception(0)
		.luck(0)
		.hunger(0),

	new HeroClass(2)
		.setName('Rogue')
		.setEmoji('🗡️')
		.setSummary('Sneaky, agile, and cunning')
		.setDescription('Rogues operate in the space between seen and unseen. They are quick, opportunistic, and tend to avoid fair fights on principle.')
		.setPreferredStarterWeapons('dagger', 'shortbow', 'sickle')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.KNIFE)
		.modifiers
		.strength(0)
		.agility(3)
		.stamina(0)
		.wisdom(-1)
		.intelligence(0)
		.perception(0)
		.luck(2)
		.hunger(-3),

	new HeroClass(3)
		.setName('Mage')
		.setEmoji('🪄')
		.setSummary('Wise, perceptive, and curious')
		.setDescription('Mages have spent years studying the arcane. They are fragile in a fight but can channel more magical force than just about anyone else.')
		.setPreferredStarterWeapons('staff', 'umbrella', 'taser')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.STAFF)
		.modifiers
		.strength(-1)
		.agility(0)
		.stamina(-1)
		.wisdom(4)
		.intelligence(1)
		.perception(2)
		.luck(1)
		.hunger(-4),

	new HeroClass(4)
		.setName('Cleric')
		.setEmoji('⛪')
		.setSummary('Faithful, steady, and protective')
		.setDescription('Clerics draw their power from devotion. They are not the strongest fighters, but they understand magic and healing in ways most classes never will.')
		.setPreferredStarterWeapons('staff', 'club', 'buckler')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.STAFF)
		.modifiers
		.strength(-1)
		.agility(0)
		.stamina(0)
		.wisdom(2)
		.intelligence(3)
		.perception(1)
		.luck(0)
		.hunger(-5),

	new HeroClass(5)
		.setName('Ranger')
		.setEmoji('🏹')
		.setSummary('Sharp, patient, and precise')
		.setDescription('Rangers are hunters first. Comfortable in the wilderness and deadly at range, they are patient, observant, and rarely caught off guard.')
		.setPreferredStarterWeapons('shortbow', 'spear', 'dagger')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.PROJECTILE)
		.modifiers
		.strength(0)
		.agility(2)
		.stamina(0)
		.wisdom(-1)
		.intelligence(0)
		.perception(0)
		.luck(2)
		.hunger(-2),

	new HeroClass(6)
		.setName('Bard')
		.setEmoji('🎻')
		.setSummary('Charming, inspiring, and clever')
		.setDescription('Bards travel, perform, and pick up a little of everything along the way. They are perceptive, socially sharp, and know more useful things than they probably should.')
		.setPreferredStarterWeapons('ukulele', 'dagger', 'whip')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.MISC)
		.modifiers
		.strength(0)
		.agility(1)
		.stamina(0)
		.wisdom(1)
		.intelligence(0)
		.perception(2)
		.luck(1)
		.hunger(-4),

	new HeroClass(7)
		.setName('Paladin')
		.setEmoji('🛡️')
		.setSummary('Honorable, fearless, and loyal')
		.setDescription('Paladins are warriors bound by a code. They are tough, capable in a fight, and have enough spiritual training to back it up with more than just steel.')
		.setPreferredStarterWeapons('shortsword', 'club', 'buckler')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.SHIELD)
		.modifiers
		.strength(2)
		.agility(0)
		.stamina(1)
		.wisdom(-1)
		.intelligence(2)
		.perception(-1)
		.luck(0)
		.hunger(-5),

	new HeroClass(8)
		.setName('Monk')
		.setEmoji('🥋')
		.setSummary('Focused, disciplined, and swift')
		.setDescription('Monks have trained their body to be the weapon. Years of discipline have made them fast and resilient, and they do not need much else.')
		.setPreferredStarterWeapons('gloves', 'staff', 'fork_baton')
		.setPreferredWeaponFamilyId(WEAPON_FAMILY.FIST)
		.modifiers
		.strength(1)
		.agility(2)
		.stamina(2)
		.wisdom(-2)
		.intelligence(0)
		.perception(-1)
		.luck(0)
		.hunger(-2)
];