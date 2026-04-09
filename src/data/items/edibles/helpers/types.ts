export interface EdibleLocalizationEntry {
	displayName: string;
	description: string;
}

export type EdibleLocalization = Record<string, EdibleLocalizationEntry>;

export interface EdibleEffect {
	hook: string;
	id: string;
	target: string;
	magnitude: number;
	duration: number;
	chance: number;
	[key: string]: unknown;
}

export interface EdibleDefinition {
	internalId: number;
	id: string;
	displayName: string;
	description: string;
	tags: string[];
	rarity: string;
	stackable: number;
	subtype: string;
	localization: EdibleLocalization;
	satiation: number;
	requiresCooking: boolean;
	cookedFormId: string | null;
	refrigeratable: boolean;
	decay: number;
	effects: EdibleEffect[];
	created_at: string;
	archived?: boolean;
}

export type ActiveEdibleDefinition = EdibleDefinition & { archived?: false | undefined };
