import type { Length, Mass, Pressure } from 'unitsnet-js';

export type ArmorTypeId = 'helm' | 'chest' | 'leggings' | 'boots';
export type ArmorStatId = 'critInfluence' | 'defense' | 'evasion' | 'stride';
export type ArmorMaterialId =
	| 'paper'
	| 'bread'
	| 'cardboard'
	| 'fabric'
	| 'seashells'
	| 'bone'
	| 'leather'
	| 'wood'
	| 'scales'
	| 'chainmail'
	| 'ironplate'
	| 'obsidian'
	| 'kevlar'
	| 'diamondplate';

/** Localized armor copy for a specific language code. */
export interface ArmorLocalizationEntry {
	/** Localized display name shown to the player. */
	displayName: string;
	/** Localized description text for the armor entry. */
	description: string;
}

/** Localized variants keyed by language code. */
export type ArmorLocalization = Record<string, ArmorLocalizationEntry>;

/** Tunable multipliers affecting armor stat calculations. */
export interface ArmorQualityMultipliers {
	/** Multiplier applied to the armor's protection formula output. */
	protection: number;
}

/** Physical material parameters used by a helmet slot. */
export interface ArmorHelmetMaterial {
	yieldStress: Pressure;
}

/** Physical material parameters used by a chest slot. */
export interface ArmorChestMaterial {
	thickness: Length;
	hardness: Pressure;
}

/** Physical material parameters used by a leggings slot. */
export interface ArmorLeggingsMaterial {
	elasticity: Pressure;
}

/** Physical material parameters used by a boots slot. */
export interface ArmorBootsMaterial {
	tractionCoefficient: number;
}

/** Full material profile used when resolving armor effects. */
export interface ArmorMaterialDefinition {
	id: ArmorMaterialId;
	displayName: string;
	description: string;
	types: {
		helm: ArmorHelmetMaterial;
		chest: ArmorChestMaterial;
		leggings: ArmorLeggingsMaterial;
		boots: ArmorBootsMaterial;
	};
	/** Base material mass used in evasion calculations. */
	baseWeight: Mass;
	/** Spread factor used to widen or narrow the resolved effect range. */
	variance: number;
}

/** Metadata for a wearable armor entry. */
export interface ArmorDefinition {
	/** Stable numeric index used in debug listings. */
	internalId: number;
	/** Internal unique id used by the game data. */
	id: string;
	/** Human-readable name shown in UI. */
	displayName: string;
	/** Equipped slot for the armor piece. */
	type: ArmorTypeId;
	/** Material key used to resolve derived defensive values. */
	material: ArmorMaterialId;
	/** Flavor and gameplay description for the armor. */
	description: string;
	/** Search and categorization tags. */
	tags: string[];
	/** Optional localized copy overrides. */
	localization: ArmorLocalization;
	/** Multiplier overrides affecting armor formulas. */
	qualityMultipliers: ArmorQualityMultipliers;
	/** ISO timestamp for when the entry was added. */
	created_at: string;
	/** Optional soft-delete/archive flag. */
	archived?: boolean;
}

/** Public config describing what each armor slot contributes. */
export interface ArmorTypeDefinition {
	id: ArmorTypeId;
	displayName: string;
	stat: ArmorStatId;
	materialProperty: string;
	description: string;
}

/** Resolved effect range for a single armor piece. */
export interface ArmorStatRange {
	stat: ArmorStatId;
	base: number;
	spread: number;
	min: number;
	max: number;
}

/** Active armor ids available to regular gameplay. */
export type ActiveArmorDefinition = ArmorDefinition & { archived?: false | undefined };
