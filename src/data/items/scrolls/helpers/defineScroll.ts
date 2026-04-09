import type { ScrollDefinition, ScrollEffect, ScrollLocalization } from './types.js';

type ScrollInput = Omit<
	Partial<ScrollDefinition>,
	'id' | 'tags' | 'localization' | 'effects'
> &
	Pick<ScrollDefinition, 'id'> & {
		tags?: string[];
		localization?: ScrollLocalization;
		effects?: ScrollEffect[];
	};

export function defineScroll(scroll: ScrollInput): ScrollDefinition {
	const {
		id,
		displayName,
		tags = [],
		localization = {},
		effects = [],
		...rest
	} = scroll;

	return {
		internalId: 0,
		id,
		displayName: displayName ?? id,
		description: '',
		rarity: 'common',
		stackable: 1,
		subtype: 'scroll',
		spellId: '',
		school: '',
		charges: 1,
		castTime: 0,
		intelligenceRequirement: null,
		failChance: 0,
		cursed: false,
		learnOnUse: false,
		fragile: true,
		singleUse: true,
		created_at: '',
		...rest,
		tags: [...tags],
		localization: { ...localization },
		effects: effects.map((effect) => ({ ...effect })),
	};
}
