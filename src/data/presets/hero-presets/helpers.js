import { HERO_CLASSES } from './classes.js';
import { HERO_RACES } from './races.js';
import { HERO_STATS } from './stats.js';

export function getRaceById(raceId) {
	return HERO_RACES.find((race) => String(race.id) === String(raceId)) || null;
}

export function getClassById(classId) {
	return HERO_CLASSES.find((heroClass) => String(heroClass.id) === String(classId)) || null;
}

export function computeHeroStats(race, heroClass) {
	const computed = {};

	for (const stat of HERO_STATS) {
		const key = stat.shortcode.toUpperCase();
		if (key === 'HUN') continue;

		const modKey = stat.shortcode.toLowerCase();
		const raceMod = race.mods?.[modKey] ?? 0;
		const classMod = heroClass.mods?.[modKey] ?? 0;
		computed[key] = (stat.defaultValue ?? 0) + (raceMod * 10) + (classMod * 10);
	}

	return computed;
}
