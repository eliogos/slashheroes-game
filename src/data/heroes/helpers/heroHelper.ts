import { EPSILON, STAT_DECIMAL_PLACES } from '../../helpers/constants.js';
import { HERO_CLASSES, HERO_RACES, HERO_STATS } from '../index.ts';
import { HERO_MODIFIER_KEY_BY_SHORTCODE } from '../types.ts';
import type {
	ComputedHeroStats,
	HeroClassDefinition,
	HeroLookupId,
	HeroRaceDefinition,
	ModifierKey,
} from '../types.ts';

export function getRaceById(raceId: HeroLookupId): HeroRaceDefinition | null {
	return HERO_RACES.find((race) => String(race.id) === String(raceId)) ?? null;
}

export function getClassById(classId: HeroLookupId): HeroClassDefinition | null {
	return HERO_CLASSES.find((heroClass) => String(heroClass.id) === String(classId)) ?? null;
}

const POINT_STATS = new Set<ModifierKey>(['str', 'agi', 'wis', 'int', 'per', 'luk']);

function roundToStatPrecision(value: number): number {
	const factor = 10 ** STAT_DECIMAL_PLACES;
	const adjustment = value >= 0 ? EPSILON : -EPSILON;
	return Math.round((value + adjustment) * factor) / factor;
}

export function computeHeroStats(
	race: HeroRaceDefinition,
	heroClass: HeroClassDefinition,
): ComputedHeroStats {
	const computed = {} as ComputedHeroStats;

	for (const stat of HERO_STATS) {
		const key = stat.shortcode;
		if (key === 'HUN') {
			continue;
		}

		if (!stat.base) {
			computed[key] = roundToStatPrecision(stat.defaultValue ?? 0);
			continue;
		}

		const modKey = HERO_MODIFIER_KEY_BY_SHORTCODE[key];
		const raceMod = race.mods[modKey] ?? 0;
		const classMod = heroClass.mods[modKey] ?? 0;
		const multiplier = POINT_STATS.has(modKey) ? 1 : 10;
		computed[key] = roundToStatPrecision((stat.defaultValue ?? 0) + (raceMod * multiplier) + (classMod * multiplier));
	}

	return computed;
}
