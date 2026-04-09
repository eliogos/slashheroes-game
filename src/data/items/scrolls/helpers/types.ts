export interface ScrollLocalizationEntry {
	displayName: string;
	description: string;
}

export type ScrollLocalization = Record<string, ScrollLocalizationEntry>;

export interface ScrollEffect {
	hook: string;
	id: string;
	target: string;
	magnitude: number;
	duration: number;
	chance: number;
	[key: string]: unknown;
}

export interface ScrollDefinition {
	internalId: number;
	id: string;
	displayName: string;
	description: string;
	tags: string[];
	rarity: string;
	stackable: number;
	subtype: string;
	localization: ScrollLocalization;
	spellId: string;
	school: string;
	charges: number;
	castTime: number;
	intelligenceRequirement: number | null;
	failChance: number;
	cursed: boolean;
	learnOnUse: boolean;
	fragile: boolean;
	singleUse: boolean;
	effects: ScrollEffect[];
	created_at: string;
	archived?: boolean;
}

export type ActiveScrollDefinition = ScrollDefinition & { archived?: false | undefined };
