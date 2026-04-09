import { mysterious_scroll } from './_entries/mysterious_scroll.js';
import type { ActiveScrollDefinition, ScrollDefinition } from './helpers/index.js';

export { defineScroll } from './helpers/index.js';
export * from './helpers/index.js';

export const scrolls: ScrollDefinition[] = [
	mysterious_scroll,
];

export const activeScrolls: ActiveScrollDefinition[] = scrolls.filter(
	(entry) => !entry.archived,
) as ActiveScrollDefinition[];

export function getScrollById(id: string): ActiveScrollDefinition | null {
	return activeScrolls.find((entry) => entry.id === id) ?? null;
}
