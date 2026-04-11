import { resolveDisplay, type ItemDisplayInput } from '../../helpers/display.js';
import { EDIBLE_SUBTYPE, SATIATION_TYPE, SPOILAGE_STATE } from './constants.js';
import type { EdibleDefinition, EdibleEffect } from './types.js';

type EdibleInput = Omit<
	Partial<EdibleDefinition>,
	'id' | 'display' | 'effects'
> &
	Pick<EdibleDefinition, 'id'> & {
		display?: ItemDisplayInput;
		effects?: EdibleEffect[];
	};

export function defineEdible(edible: EdibleInput): EdibleDefinition {
	const {
		id,
		display = {},
		effects = [],
		...rest
	} = edible;
	const resolvedDisplay = resolveDisplay(id, display);

	return {
		internalId: 0,
		id,
		display: resolvedDisplay,
		rarity: 'common',
		stackable: 1,
		subtype: EDIBLE_SUBTYPE.FOOD,
		energy: 0,
		satiationType: SATIATION_TYPE.INSTANT,
		form: '',
		requiresCooking: false,
		cookedFormId: null,
		refrigeratable: false,
		decay: 0,
		decayAction: 1,
		spoilageState: SPOILAGE_STATE.FRESH,
		created_at: '',
		...rest,
		effects: effects.map((effect) => ({ ...effect })),
	};
}
