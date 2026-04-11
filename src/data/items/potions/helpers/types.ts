import type { ItemDisplay } from '../../helpers/display.js';

export interface PotionEffect {
	hook: string;
	id: string;
	target: string;
	magnitude: number;
	duration: number;
	chance: number;
	[key: string]: unknown;
}

export interface PotionDefinition {
	internalId: number;
	id: string;
	display: ItemDisplay;
	rarity: string;
	stackable: number;
	subtype: string;
	volume: number;
	concentration: number;
	servings: number;
	onset: number;
	duration: number;
	school: string;
	effects: PotionEffect[];
	mixable: boolean;
	volatile: boolean;
	viscosity: number;
	containerType: string;
	cursed: boolean;
	perishable: boolean;
	shelfLife: number | null;
	spoilage: number;
	spoiledId: string | null;
	created_at: string;
	archived?: boolean;
}

export type ActivePotionDefinition = PotionDefinition & { archived?: false | undefined };
