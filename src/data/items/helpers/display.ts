export interface ItemDisplayEntry {
	name: string;
	description: string;
	plural?: string;
}

export type ItemDisplay = { en: ItemDisplayEntry } & Record<string, ItemDisplayEntry>;
export type ItemDisplayInput = Record<string, Partial<ItemDisplayEntry>>;

export function resolveDisplay(
	id: string,
	display: ItemDisplayInput = {},
): ItemDisplay {
	const fallbackEntry = display.en ?? Object.values(display)[0] ?? {};
	const baseName = fallbackEntry.name ?? id;
	const baseDescription = fallbackEntry.description ?? '';
	const locales = new Set<string>(['en', ...Object.keys(display)]);

	return Object.fromEntries(
		Array.from(locales).map((locale) => {
			const baseLocale = display.en ?? fallbackEntry;
			const entry = display[locale] ?? {};

			return [locale, {
				name: entry.name ?? (locale === 'en' ? baseName : baseLocale.name ?? baseName),
				description: entry.description ?? (locale === 'en' ? baseDescription : baseLocale.description ?? baseDescription),
				...(entry.plural ? { plural: entry.plural } : {}),
			}];
		}),
	) as ItemDisplay;
}
