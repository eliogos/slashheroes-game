import type { HeroStatDefinition } from '../types.js';

/**
 * Player-facing Hunger is a normalized 0-100 view of a larger internal energy pool.
 * Low values indicate energy danger even though the underlying kcal reserve can vary by race.
 */
export const HUNGER_STAT_CONTEXT = {
	min: 0,
	max: 100,
	BaselineKcal: {
		low: 2000,
		high: 2500,
		average: 2250,
	},
	dangerThreshold: 15,
} as const;

export const hunger: HeroStatDefinition = {
	name: 'Hunger',
	shortcode: 'HUN',
	type: 'Resource',
	base: true,
	influences: 'Energy safety, recovery, and overall performance',
	defaultValue: HUNGER_STAT_CONTEXT.max,
};
