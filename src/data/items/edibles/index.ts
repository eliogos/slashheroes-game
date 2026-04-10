import {
	cooked_meat,
	honeyed_steak,
	raw_meat,
	rotten_meat,
} from './_entries/meat.js';
import type { ActiveEdibleDefinition, EdibleDefinition } from './helpers/index.js';

export { defineEdible, defineVariant } from './helpers/index.js';
export * from './helpers/index.js';

export const edibles: EdibleDefinition[] = [
	raw_meat,
	cooked_meat,
	honeyed_steak,
	rotten_meat,
];

export const activeEdibles: ActiveEdibleDefinition[] = edibles.filter(
	(entry) => !entry.archived,
) as ActiveEdibleDefinition[];

export function getEdibleById(id: string): ActiveEdibleDefinition | null {
	return activeEdibles.find((entry) => entry.id === id) ?? null;
}
