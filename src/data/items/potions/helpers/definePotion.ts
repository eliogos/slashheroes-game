import type { PotionDefinition, PotionEffect, PotionLocalization } from './types.js';

type PotionInput = Omit<
	Partial<PotionDefinition>,
	'id' | 'tags' | 'localization' | 'effects'
> &
	Pick<PotionDefinition, 'id'> & {
		tags?: string[];
		localization?: PotionLocalization;
		effects?: PotionEffect[];
	};

export function definePotion(potion: PotionInput): PotionDefinition {
	const {
		id,
		displayName,
		tags = [],
		localization = {},
		effects = [],
		...rest
	} = potion;

	return {
		internalId: 0,
		id,
		displayName: displayName ?? id,
		description: '',
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
		tags: [...tags],
		localization: { ...localization },
		effects: effects.map((effect) => ({ ...effect })),
	};
}
