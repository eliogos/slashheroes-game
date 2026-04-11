/** Core attribute modifiers applied during hero stat calculation. */
export interface HeroModifiers {
	/** Strength modifier affecting melee power and physical impact. */
	str: number;
	/** Agility modifier affecting speed, evasion, and finesse. */
	agi: number;
	/** Stamina modifier affecting endurance and sustained actions. */
	sta: number;
	/** Health modifier affecting total survivability. */
	hp: number;
	/** Mana modifier affecting magical capacity and spellcasting endurance. */
	mp: number;
	/** Wisdom modifier affecting magical growth and experience gain. */
	wis: number;
	/** Intelligence modifier affecting learning, knowledge, and crafting aptitude. */
	int: number;
	/** Perception modifier affecting awareness, accuracy, and detection. */
	per: number;
	/** Luck modifier affecting random outcomes and drop quality. */
	luk: number;
	/** Hunger modifier affecting upkeep pressure and recovery balance. */
	hun: number;
	/** Experience modifier affecting leveling pace and long-term progression. */
	exp: number;
}

export type ModifierKey = keyof HeroModifiers;
export type HeroStatShortcode = Uppercase<ModifierKey>;

/** Final computed hero stat totals keyed by the display shortcode (`STR`, `HP`, etc.). */
export interface HeroStats extends Record<HeroStatShortcode, number> {}

/** Shared lookup to translate a displayed stat shortcode back to its internal modifier key. */
export const HERO_MODIFIER_KEY_BY_SHORTCODE = {
	STR: 'str',
	AGI: 'agi',
	STA: 'sta',
	HP: 'hp',
	MP: 'mp',
	WIS: 'wis',
	INT: 'int',
	PER: 'per',
	LUK: 'luk',
	HUN: 'hun',
	EXP: 'exp',
} as const satisfies Record<HeroStatShortcode, ModifierKey>;

/** Shared metadata used by both hero classes and hero races. */
export interface HeroDefinition {
	/** Stable numeric identifier used in storage and UI selections. */
	id: number;
	/** Display name shown to players. */
	name: string;
	/** Emoji used in Discord menus and summaries. */
	emoji: string;
	/** Short one-line pitch shown in selection UIs. */
	summary: string;
	/** Longer lore or flavor description for the option. */
	description: string;
	/** Full modifier set applied by this definition. */
	mods: HeroModifiers;
}

/** Playstyle definition for a hero class choice. */
export interface HeroClassDefinition extends HeroDefinition {
	/** Starter weapons this class prefers during onboarding or loadout generation. */
	preferredStarterWeapons: string[];
	/** Bitflag or numeric family id matching `WEAPON_FAMILY`. */
	preferredWeaponFamilyId: number | null;
}

/** Ancestry/race definition that adjusts base stats and inventory capacity. */
export interface HeroRaceDefinition extends HeroDefinition {
	/** Total inventory slots granted by the race. */
	inventorySlots: number;
}

export type HeroStatType = 'Physical' | 'Mental' | 'Resource' | 'Progression' | 'Derived';

export interface HeroStatDefinition {
	name: string;
	shortcode: HeroStatShortcode;
	type: HeroStatType;
	base: boolean;
	influences: string;
	defaultValue: number;
}

export type HeroDerivedStatShortcode =
	| 'FOC'
	| 'ATKSPD'
	| 'EVA'
	| 'ACC'
	| 'CRIT'
	| 'WILL'
	| 'PDMG'
	| 'WCAP'
	| 'STAREG'
	| 'MPREG'
	| 'POISE'
	| 'MEND'
	| 'RFLX';

export interface HeroDerivedStatDefinition {
	name: string;
	shortcode: HeroDerivedStatShortcode;
	type: 'Derived';
	base: false;
	influences: string;
	derivedFrom: HeroStatShortcode[];
}

export interface HeroPhysicalDamageRange {
	min: number;
	max: number;
	average: number;
}

export interface HeroWeightCapacityProfile {
	safe: number;
	max: number;
	agilityPenaltyPerKg: number;
	physicalDamagePenaltyPerKg: number;
}

export interface HeroWillpowerProfile {
	/**
	 * Luck-derived additive bias applied to the die roll before normalizing to 0–1.
	 * The die itself (sides) is not stored here — it defaults to d20 and can be
	 * overridden by equipped items or artifacts at roll time.
	 */
	bonus: number;
}

export interface HeroStaminaRegenProfile {
	perSecond: number;
	idleDelaySeconds: number;
}

export interface HeroManaRegenProfile {
	perAction: number;
}

export interface HeroMagicEffectEnduranceProfile {
	reductionChance: number;
	nullifyChance: number;
	appliesTo: 'positive-or-negative';
}

export interface DerivedHeroStats {
	focus: number;
	attackSpeed: number;
	evasion: number;
	accuracy: number;
	critChance: number;
	willpower: HeroWillpowerProfile;
	physicalDamage: HeroPhysicalDamageRange;
	weightCap: HeroWeightCapacityProfile;
	staminaRegen: HeroStaminaRegenProfile;
	manaRegen: HeroManaRegenProfile;
	poise: number;
	magicEffectEndurance: HeroMagicEffectEnduranceProfile;
	reflex: number;
}

export type HeroLookupId = string | number | null | undefined;
export type ComputedHeroStats = HeroStats;
