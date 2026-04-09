/** Localized ammo copy for a specific language code. */
export interface AmmoLocalizationEntry {
	/** Localized display name shown to the player. */
	displayName: string;
	/** Localized description text for the ammo entry. */
	description: string;
}

/** Localized variants keyed by language code. */
export type AmmoLocalization = Record<string, AmmoLocalizationEntry>;

/** Physical qualities tracked for ammo. */
export interface AmmoQualities {
	/** Weight in grams. */
	weight: number;
}

/** Weapon-specific multipliers keyed by weapon id. */
export type AmmoWeaponAmplifiers = Record<string, number>;

/** Plain-data definition for one ammo entry. */
export interface AmmoDefinition {
	/** Stable numeric index used in lists and debugging tools. */
	internalId: number;
	/** Internal unique id used by the game data. */
	id: string;
	/** Human-readable name shown in UI. */
	displayName: string;
	/** Flavor and gameplay description for the ammo. */
	description: string;
	/** Search and categorization tags. */
	tags: string[];
	/** Optional localized copy overrides. */
	localization: AmmoLocalization;
	/** Physical qualities such as weight. */
	qualities: AmmoQualities;
	/** Bitflag compatibility mask using `WEAPON_FAMILY`. */
	compatibleFamilyFlag: number;
	/** Per-weapon damage or efficiency multipliers. */
	weaponAmplifiers: AmmoWeaponAmplifiers;
	/** ISO timestamp for when the entry was added. */
	created_at: string;
	/** Optional soft-delete/archive flag. */
	archived?: boolean;
}

/** Active ammo ids available to regular gameplay. */
export type ActiveAmmoDefinition = AmmoDefinition & { archived?: false | undefined };
