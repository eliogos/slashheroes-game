import { HERO_CLASSES } from './heroClasses.js';
import { HERO_RACES } from './heroRaces.js';
import { HERO_STATS } from './heroStats.js';

export function getRaceById(raceId) {
	return HERO_RACES.find(race => String(race.id) === String(raceId)) || null;
}

export function getClassById(classId) {
	return HERO_CLASSES.find(heroClass => String(heroClass.id) === String(classId)) || null;
}

const POINT_STATS = new Set(['str', 'agi', 'wis', 'int', 'per', 'luk']);

export function computeHeroStats(race, heroClass) {
	const computed = {};

	for (const stat of HERO_STATS) {
		const key = stat.shortcode.toUpperCase();
		if (key === 'HUN') {
			continue;
		}

		const modKey = stat.shortcode.toLowerCase();
		const raceMod = race.mods?.[modKey] ?? 0;
		const classMod = heroClass.mods?.[modKey] ?? 0;
		const multiplier = POINT_STATS.has(modKey) ? 1 : 10;
		computed[key] = (stat.defaultValue ?? 0) + (raceMod * multiplier) + (classMod * multiplier);
	}

	return computed;
}
