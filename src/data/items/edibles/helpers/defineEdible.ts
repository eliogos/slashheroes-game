import type { EdibleDefinition, EdibleEffect, EdibleLocalization } from './types.js';

type EdibleInput = Omit<
	Partial<EdibleDefinition>,
	'id' | 'tags' | 'localization' | 'effects'
> &
	Pick<EdibleDefinition, 'id'> & {
		tags?: string[];
		localization?: EdibleLocalization;
		effects?: EdibleEffect[];
	};

export function defineEdible(edible: EdibleInput): EdibleDefinition {
	const {
		id,
		displayName,
		tags = [],
		localization = {},
		effects = [],
		...rest
	} = edible;

	return {
		internalId: 0,
		id,
		displayName: displayName ?? id,
		description: '',
		rarity: 'common',
		stackable: 1,
		subtype: 'food',
		satiation: 0,
		requiresCooking: false,
		cookedFormId: null,
		refrigeratable: false,
		decay: 0,
		created_at: '',
		...rest,
		tags: [...tags],
		localization: { ...localization },
		effects: effects.map((effect) => ({ ...effect })),
	};
}
