import { small_health_potion } from './_entries/small_health_potion.js';
import type { ActivePotionDefinition, PotionDefinition } from './helpers/index.js';

export { definePotion } from './helpers/index.js';
export * from './helpers/index.js';

export const potions: PotionDefinition[] = [
	small_health_potion,
];

export const activePotions: ActivePotionDefinition[] = potions.filter(
	(entry) => !entry.archived,
) as ActivePotionDefinition[];

export function getPotionById(id: string): ActivePotionDefinition | null {
	return activePotions.find((entry) => entry.id === id) ?? null;
}
