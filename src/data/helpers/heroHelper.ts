import { HERO_CLASSES, HERO_RACES, HERO_STATS } from '../heroes/index.ts';
import { HERO_MODIFIER_KEY_BY_SHORTCODE } from '../heroes/types.ts';
import type {
	ComputedHeroStats,
	HeroClassDefinition,
	HeroLookupId,
	HeroRaceDefinition,
	ModifierKey,
} from '../heroes/types.ts';

export function getRaceById(raceId: HeroLookupId): HeroRaceDefinition | null {
	return HERO_RACES.find((race) => String(race.id) === String(raceId)) ?? null;
}

export function getClassById(classId: HeroLookupId): HeroClassDefinition | null {
	return HERO_CLASSES.find((heroClass) => String(heroClass.id) === String(classId)) ?? null;
}

const POINT_STATS = new Set<ModifierKey>(['str', 'agi', 'wis', 'int', 'per', 'luk']);

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

		const modKey = HERO_MODIFIER_KEY_BY_SHORTCODE[key];
		const raceMod = race.mods[modKey] ?? 0;
		const classMod = heroClass.mods[modKey] ?? 0;
		const multiplier = POINT_STATS.has(modKey) ? 1 : 10;
		computed[key] = (stat.defaultValue ?? 0) + (raceMod * multiplier) + (classMod * multiplier);
	}

	return computed;
}
