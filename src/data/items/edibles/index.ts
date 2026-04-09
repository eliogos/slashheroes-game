import { cooked_meat } from './_entries/cooked_meat.js';
import { honeyed_steak } from './_entries/honeyed_steak.js';
import { raw_meat } from './_entries/raw_meat.js';
import type { ActiveEdibleDefinition, EdibleDefinition } from './helpers/index.js';

export { defineEdible } from './helpers/index.js';
export * from './helpers/index.js';

export const edibles: EdibleDefinition[] = [
	raw_meat,
	cooked_meat,
	honeyed_steak,
];

export const activeEdibles: ActiveEdibleDefinition[] = edibles.filter(
	(entry) => !entry.archived,
) as ActiveEdibleDefinition[];

export function getEdibleById(id: string): ActiveEdibleDefinition | null {
	return activeEdibles.find((entry) => entry.id === id) ?? null;
}
