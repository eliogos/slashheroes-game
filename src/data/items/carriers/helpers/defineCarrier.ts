import type {
	CarrierDefinition,
	CarrierEffect,
	CarrierLocalization,
} from './types.js';

type CarrierInput = Omit<
	Partial<CarrierDefinition>,
	'id' | 'tags' | 'localization' | 'allowedTypes' | 'allowedTags' | 'mergeTiers' | 'acquiredFrom' | 'effects'
> &
	Pick<CarrierDefinition, 'id'> & {
		tags?: string[];
		localization?: CarrierLocalization;
		allowedTypes?: string[] | null;
		allowedTags?: string[] | null;
		mergeTiers?: string[];
		acquiredFrom?: string[];
		effects?: CarrierEffect[];
	};

export function defineCarrier(carrier: CarrierInput): CarrierDefinition {
	const {
		id,
		displayName,
		tags = [],
		localization = {},
		allowedTypes = null,
		allowedTags = null,
		mergeTiers = [],
		acquiredFrom = [],
		effects = [],
		...rest
	} = carrier;

	return {
		internalId: 0,
		id,
		displayName: displayName ?? id,
		description: '',
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
		tags: [...tags],
		localization: { ...localization },
		allowedTypes: allowedTypes ? [...allowedTypes] : null,
		allowedTags: allowedTags ? [...allowedTags] : null,
		mergeTiers: [...mergeTiers],
		acquiredFrom: [...acquiredFrom],
		effects: [...effects],
	};
}
