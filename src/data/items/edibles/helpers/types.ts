import type { ItemDisplay, ItemDisplayEntry } from '../../helpers/display.js';
import type {
	EdibleSubtype,
	SatiationType,
	SpoilageState,
} from './constants.js';

export type EdibleDisplayEntry = ItemDisplayEntry;
export type EdibleDisplay = ItemDisplay;

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
	display: EdibleDisplay;
	rarity: string;
	stackable: number;
	subtype: EdibleSubtype;
	/**
	 * Internal food energy stored in kilocalories.
	 * Author semantically with `Energy.FromKilocalories(...).Kilocalories`, then derive the normalized value with `getBaseSatiation`.
	 */
	energy: number;
	/** Action-based distribution behavior applied after `getBaseSatiation` is derived. */
	satiationType: SatiationType;
	/** Manual variant label such as `raw`, `cooked`, or `glazed`. */
	form: string;
	requiresCooking: boolean;
	cookedFormId: string | null;
	refrigeratable: boolean;
	/** Total action budget before the item reaches its spoiled endpoint under neutral conditions. */
	decay: number;
	/** Number of actions between each spoilage tick when decay is processed incrementally. */
	decayAction: number;
	/** Current freshness bucket after decay has progressed. */
	spoilageState: SpoilageState;
	effects: EdibleEffect[];
	created_at: string;
	archived?: boolean;
}

export type ActiveEdibleDefinition = EdibleDefinition & { archived?: false | undefined };
