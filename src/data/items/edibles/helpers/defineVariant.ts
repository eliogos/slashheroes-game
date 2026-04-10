import { defineEdible } from './defineEdible.js';
import type { EdibleDefinition, EdibleEffect, EdibleLocalization } from './types.js';

type EdibleVariantInput = Omit<Partial<EdibleDefinition>, 'tags' | 'localization' | 'effects'> & {
	tags?: string[];
	localization?: EdibleLocalization;
	effects?: EdibleEffect[];
};

/**
 * Creates a manual variant by extending a base edible entry.
 * Variants inherit the base internal id unless they explicitly override it.
 */
export function defineVariant(base: EdibleDefinition, variant: EdibleVariantInput): EdibleDefinition {
	const {
		tags,
		localization,
		effects,
		...rest
	} = variant;

	return defineEdible({
		...base,
		...rest,
		tags: tags ? Array.from(new Set([...base.tags, ...tags])) : [...base.tags],
		localization: { ...base.localization, ...(localization ?? {}) },
		effects: effects ? effects.map((effect) => ({ ...effect })) : base.effects.map((effect) => ({ ...effect })),
	});
}
