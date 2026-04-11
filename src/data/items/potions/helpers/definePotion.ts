import { resolveDisplay, type ItemDisplayInput } from '../../helpers/display.js';
import type { PotionDefinition, PotionEffect } from './types.js';

type PotionInput = Omit<
	Partial<PotionDefinition>,
	'id' | 'display' | 'effects'
> &
	Pick<PotionDefinition, 'id'> & {
		display?: ItemDisplayInput;
		effects?: PotionEffect[];
	};

export function definePotion(potion: PotionInput): PotionDefinition {
	const {
		id,
		display = {},
		effects = [],
		...rest
	} = potion;
	const resolvedDisplay = resolveDisplay(id, display);

	return {
		internalId: 0,
		id,
		display: resolvedDisplay,
		rarity: 'common',
		stackable: 1,
		subtype: 'potion',
		volume: 0,
		concentration: 1,
		servings: 1,
		onset: 0,
		duration: 0,
		school: '',
		mixable: false,
		volatile: false,
		viscosity: 0,
		containerType: 'vial',
		cursed: false,
		perishable: false,
		shelfLife: null,
		spoilage: 0,
		spoiledId: null,
		created_at: '',
		...rest,
		effects: effects.map((effect) => ({ ...effect })),
	};
}
