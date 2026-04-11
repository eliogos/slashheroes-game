export { DEFAULT_MODIFIERS, defineHero } from './defineHero.js';
export { defineRace } from './defineRace.js';
export {
	LEVELING_CURVE,
	STAT_POINT_CURVE,
	getAvailableStatPoints,
	getExactLevelFromExperience,
	getExperienceForLevel,
	getExperienceProgress,
	getExperienceToNextLevel,
	getLevelFromExperience,
	getStatPointProgress,
	getStatPointsForLevel,
	getTotalStatPointsForLevel,
} from './leveling.js';
export {
	UPGRADABLE_HERO_STAT_RULES,
	applyStatPointAllocation,
	getIntelligenceUtilityMultiplier,
	getSpentStatPointCount,
	getWisdomExperienceMultiplier,
	isUpgradableHeroStat,
} from './statUpgrades.js';
export type { ExperienceProgress, StatPointProgress } from './leveling.js';
export type { HeroStatPointAllocation, UpgradableHeroStatShortcode } from './statUpgrades.js';
