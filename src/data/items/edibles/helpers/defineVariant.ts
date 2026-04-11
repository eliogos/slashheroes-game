import { defineEdible } from './defineEdible.js';
import type { EdibleDefinition, EdibleDisplayEntry, EdibleEffect } from './types.js';

type EdibleDisplayInput = Record<string, Partial<EdibleDisplayEntry>>;

type EdibleVariantInput = Omit<Partial<EdibleDefinition>, 'display' | 'effects'> & {
	display?: EdibleDisplayInput;
	effects?: EdibleEffect[];
};

/**
 * Creates a manual variant by extending a base edible entry.
 * Variants inherit the base internal id unless they explicitly override it.
 */
export function defineVariant(base: EdibleDefinition, variant: EdibleVariantInput): EdibleDefinition {
	const {
		display,
		effects,
		...rest
	} = variant;

	const locales = new Set<string>(['en', ...Object.keys(base.display), ...Object.keys(display ?? {})]);
	const mergedDisplay = Object.fromEntries(
		Array.from(locales).map((locale) => [
			locale,
			{
				...base.display[locale],
				...(display?.[locale] ?? {}),
			},
		]),
	) as EdibleDisplayInput;

	return defineEdible({
		...base,
		...rest,
		display: mergedDisplay,
		effects: effects ? effects.map((effect) => ({ ...effect })) : base.effects.map((effect) => ({ ...effect })),
	});
}
