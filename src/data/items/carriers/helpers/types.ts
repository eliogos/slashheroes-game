export type CarrierRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'unique';

export interface CarrierEffect {
	hook: string;
	id: string;
	target: string;
	magnitude: number;
	duration: number;
	chance: number;
}

export interface CarrierLocalizationEntry {
	displayName: string;
	description: string;
}

export type CarrierLocalization = Record<string, CarrierLocalizationEntry>;

export interface CarrierDefinition {
	internalId: number;
	id: string;
	displayName: string;
	description: string;
	tags: string[];
	rarity: CarrierRarity;
	unique: boolean;
	stackable: boolean;
	localization: CarrierLocalization;
	occupiedSlots: number;
	quickAccess: boolean;
	allowedTypes: string[] | null;
	allowedTags: string[] | null;
	slots: number | null;
	stackLimitPerType: number | null;
	mergeable: boolean;
	mergeTiers: string[];
	effectMode: string | null;
	equipSlot: string | null;
	acquiredFrom: string[];
	effects: CarrierEffect[];
	padded?: boolean;
	waterproof?: boolean;
	insulated?: boolean;
	lockable?: boolean;
	created_at: string;
	archived?: boolean;
}

export type ActiveCarrierDefinition = CarrierDefinition & { archived?: false | undefined };
