import { resolveDisplay, type ItemDisplayInput } from '../../helpers/display.js';
import type { ScrollDefinition, ScrollEffect } from './types.js';

type ScrollInput = Omit<
	Partial<ScrollDefinition>,
	'id' | 'display' | 'effects'
> &
	Pick<ScrollDefinition, 'id'> & {
		display?: ItemDisplayInput;
		effects?: ScrollEffect[];
	};

export function defineScroll(scroll: ScrollInput): ScrollDefinition {
	const {
		id,
		display = {},
		effects = [],
		...rest
	} = scroll;
	const resolvedDisplay = resolveDisplay(id, display);

	return {
		internalId: 0,
		id,
		display: resolvedDisplay,
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
		effects: effects.map((effect) => ({ ...effect })),
	};
}
