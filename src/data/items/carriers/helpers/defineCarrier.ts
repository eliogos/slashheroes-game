import { resolveDisplay, type ItemDisplayInput } from '../../helpers/display.js';
import type {
	CarrierDefinition,
	CarrierEffect,
} from './types.js';

type CarrierInput = Omit<
	Partial<CarrierDefinition>,
	'id' | 'display' | 'allowedTypes' | 'allowedTags' | 'mergeTiers' | 'acquiredFrom' | 'effects'
> &
	Pick<CarrierDefinition, 'id'> & {
		display?: ItemDisplayInput;
		allowedTypes?: string[] | null;
		allowedTags?: string[] | null;
		mergeTiers?: string[];
		acquiredFrom?: string[];
		effects?: CarrierEffect[];
	};

export function defineCarrier(carrier: CarrierInput): CarrierDefinition {
	const {
		id,
		display = {},
		allowedTypes = null,
		allowedTags = null,
		mergeTiers = [],
		acquiredFrom = [],
		effects = [],
		...rest
	} = carrier;
	const resolvedDisplay = resolveDisplay(id, display);

	return {
		internalId: 0,
		id,
		display: resolvedDisplay,
		rarity: 'common',
		unique: true,
		stackable: false,
		occupiedSlots: 1,
		quickAccess: false,
		slots: null,
		stackLimitPerType: null,
		mergeable: false,
		effectMode: null,
		equipSlot: null,
		created_at: '',
		...rest,
		allowedTypes: allowedTypes ? [...allowedTypes] : null,
		allowedTags: allowedTags ? [...allowedTags] : null,
		mergeTiers: [...mergeTiers],
		acquiredFrom: [...acquiredFrom],
		effects: [...effects],
	};
}
