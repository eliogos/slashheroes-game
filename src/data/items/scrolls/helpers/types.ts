import type { ItemDisplay } from '../../helpers/display.js';

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
	display: ItemDisplay;
	rarity: string;
	stackable: number;
	subtype: string;
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
