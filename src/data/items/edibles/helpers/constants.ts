/** High-level category used by carrier logic and food handling rules. */
export const EDIBLE_SUBTYPE = {
	FOOD: 'food',
	BEVERAGE: 'beverage',
} as const;

export type EdibleSubtype = (typeof EDIBLE_SUBTYPE)[keyof typeof EDIBLE_SUBTYPE];

/** Simple labels for how a food helps with hunger. */
export const SATIATION_TYPE = {
	INSTANT: 'instant',
	STEADY: 'steady',
	SLOWBURN: 'slowburn',
	DELAYED: 'delayed',
	THRESHOLD: 'threshold',
	BUFFER: 'buffer',
	SYNERGY: 'synergy',
	COMBO: 'combo',
	BOOST: 'boost',
} as const;

export type SatiationType = (typeof SATIATION_TYPE)[keyof typeof SATIATION_TYPE];

export interface SatiationTypeDefinition {
	id: SatiationType;
	displayName: string;
	description: string;
}

export const satiationTypeDefinitions = {
	[SATIATION_TYPE.INSTANT]: {
		id: SATIATION_TYPE.INSTANT,
		displayName: 'Instant',
		description: 'Restores hunger immediately after consumption.',
	},
	[SATIATION_TYPE.STEADY]: {
		id: SATIATION_TYPE.STEADY,
		displayName: 'Steady',
		description: 'Gives some hunger now and the rest over the next few actions.',
	},
	[SATIATION_TYPE.SLOWBURN]: {
		id: SATIATION_TYPE.SLOWBURN,
		displayName: 'Slowburn',
		description: 'In addition to restoring hunger, it also reduces hunger loss for a while.',
	},
	[SATIATION_TYPE.DELAYED]: {
		id: SATIATION_TYPE.DELAYED,
		displayName: 'Delayed',
		description: 'Hunger restoration will take effect in a defined number of actions.',
	},
	[SATIATION_TYPE.THRESHOLD]: {
		id: SATIATION_TYPE.THRESHOLD,
		displayName: 'Threshold',
		description: 'When hunger level is in danger, the restoration power is more powerful.',
	},
	[SATIATION_TYPE.BUFFER]: {
		id: SATIATION_TYPE.BUFFER,
		displayName: 'Buffer',
		description: 'Adds a temporary overflow for a while then reverts back to current hunger state.',
	},
	[SATIATION_TYPE.SYNERGY]: {
		id: SATIATION_TYPE.SYNERGY,
		displayName: 'Synergy',
		description: 'Hunger restoration becomes more powerful when under effects or is eaten with another food after another.',
	},
	[SATIATION_TYPE.COMBO]: {
		id: SATIATION_TYPE.COMBO,
		displayName: 'Combo',
		description: 'Eating the same food in a row scales up the restoration.',
	},
	[SATIATION_TYPE.BOOST]: {
		id: SATIATION_TYPE.BOOST,
		displayName: 'Boost',
		description: 'Fills hunger and also gives a short extra bonus for a few actions.',
	},
} as const satisfies Readonly<Record<SatiationType, SatiationTypeDefinition>>;

/** Current freshness stage once spoilage has started progressing. */
export const SPOILAGE_STATE = {
	FRESH: 'fresh',
	AGING: 'aging',
	STALE: 'stale',
	SPOILED: 'spoiled',
	ROTTEN: 'rotten',
} as const;

export type SpoilageState = (typeof SPOILAGE_STATE)[keyof typeof SPOILAGE_STATE];

export const satiationTypeDescriptions = Object.freeze(
	Object.fromEntries(
		Object.values(satiationTypeDefinitions).map(({ id, description }) => [id, description]),
	) as Readonly<Record<SatiationType, string>>,
);

export const edibleSubtypeIds = Object.values(EDIBLE_SUBTYPE);
export const satiationTypeIds = Object.values(SATIATION_TYPE);
export const spoilageStateIds = Object.values(SPOILAGE_STATE);
