import { describe, expect, it } from 'vitest';
import {
	applyStatPointAllocation,
	computeHeroStats,
	defineHero,
	defineRace,
	getAccuracy,
	getAvailableStatPoints,
	getBaseATKSpeed,
	getBaseEvasion,
	getCritChance,
	getExperienceForLevel,
	getExperienceProgress,
	getExperienceToNextLevel,
	getIntelligenceUtilityMultiplier,
	getLevelFromExperience,
	getMagicEffectEndurance,
	getManaRegenByActions,
	getManaRegenPerAction,
	getPhysicalDmg,
	getPoise,
	getSpentStatPointCount,
	getStaminaRegenIdleDelay,
	getStaminaRegenPerSecond,
	getStatPointsForLevel,
	getTotalStatPointsForLevel,
	getWeightCap,
	getWillpower,
	getWisdomExperienceMultiplier,
	HERO_DERIVED_STATS,
	HERO_STATS,
} from '../src/data/heroes/index.ts';

describe('hero definition helpers', () => {
	it('fills missing hero fields with defaults', () => {
		const heroClass = defineHero({
			id: 99,
			name: 'Warrior',
			emoji: '⚔️',
			summary: 'Brave, relentless, and mighty',
			description: 'A test class using the default Warrior-style data shape.',
			preferredStarterWeapons: ['dagger', 'shortbow'],
			mods: {
				str: 1,
				agi: 2,
				sta: -1,
				wis: 3,
				int: 0,
				per: 4,
				luk: 1,
				hun: -2,
			},
		});

		expect(heroClass).toMatchObject({
			id: 99,
			name: 'Warrior',
			emoji: '⚔️',
			preferredStarterWeapons: ['dagger', 'shortbow'],
			mods: {
				str: 1,
				agi: 2,
				sta: -1,
				hp: 0,
				mp: 0,
				wis: 3,
				int: 0,
				per: 4,
				luk: 1,
				hun: -2,
			},
		});
	});

	it('combines race and class modifiers into computed stats', () => {
		const race = defineRace({
			id: 50,
			name: 'Human',
			inventorySlots: 11,
			mods: {
				str: 1,
				hp: 1,
				mp: 2,
			},
		});

		const heroClass = defineHero({
			id: 51,
			name: 'Warrior',
			mods: {
				str: 2,
				wis: 1,
			},
		});

		const computed = computeHeroStats(race, heroClass);

		expect(race.inventorySlots).toBe(11);
		expect(computed.STR).toBe(13);
		expect(computed.HP).toBe(110);
		expect(computed.MP).toBe(120);
		expect(computed.WIS).toBe(11);
		expect(computed.EXP).toBe(0);
	});

	it('marks base stats explicitly and keeps hunger as a base resource', () => {
		const hungerStat = HERO_STATS.find((stat) => stat.shortcode === 'HUN');
		const experienceStat = HERO_STATS.find((stat) => stat.shortcode === 'EXP');
		const strengthStat = HERO_STATS.find((stat) => stat.shortcode === 'STR');

		expect(strengthStat).toMatchObject({
			base: true,
			type: 'Physical',
		});
		expect(hungerStat).toMatchObject({
			base: true,
			type: 'Resource',
		});
		expect(experienceStat).toMatchObject({
			base: false,
			type: 'Progression',
		});
	});

	it('defines reusable derived stat helpers from the core stats', () => {
		expect(HERO_DERIVED_STATS.every((stat) => stat.base === false)).toBe(true);
		expect(HERO_DERIVED_STATS[0]?.id).toBe(12);
		expect(HERO_DERIVED_STATS.map((stat) => stat.name)).toEqual(
			expect.arrayContaining([
				'Focus',
				'Attack Speed',
				'Evasion',
				'Accuracy',
				'Crit Chance',
				'Willpower',
				'Physical Damage',
				'Weight Capacity',
				'Stamina Regen',
				'Mana Regen',
				'Poise',
				'Magic Endurance',
			]),
		);
		expect(getBaseATKSpeed(14)).toBe(1.08);
		expect(getBaseEvasion(14)).toBe(0.11);
		expect(getAccuracy(13)).toBe(0.59);
		expect(getCritChance(13, 12)).toBe(0.09);
		expect(getStaminaRegenIdleDelay(14, 12)).toBe(2.38);
		expect(getStaminaRegenPerSecond(14, 12)).toBe(5.2);
		expect(getManaRegenPerAction(12, 14, 100)).toBe(0.75);
		expect(getManaRegenByActions(12, 14, 4, 100)).toBe(3);
		expect(getPoise(15, 12)).toBe(82);
		expect(getPhysicalDmg(15)).toEqual({
			min: 2,
			max: 5,
			average: 3.5,
		});
		expect(getWeightCap(14)).toEqual({
			safe: 42,
			max: 61,
			agilityPenaltyPerKg: 0.015,
			physicalDamagePenaltyPerKg: 0.02,
		});
		expect(getWillpower(12)).toEqual({ bonus: 1 });
		expect(getWillpower(10)).toEqual({ bonus: 0 });
		expect(getWillpower(8)).toEqual({ bonus: -1 });
		expect(getMagicEffectEndurance(120, 12)).toEqual({
			reductionChance: 0.086,
			nullifyChance: 0.024,
			appliesTo: 'positive-or-negative',
		});
	});

	it('applies stat point upgrades only to the allowed hero stats', () => {
		const baseStats = computeHeroStats(
			defineRace({ id: 60, name: 'Human', inventorySlots: 10 }),
			defineHero({ id: 61, name: 'Adventurer' }),
		);
		const upgraded = applyStatPointAllocation(baseStats, {
			STR: 2,
			HP: 3,
			AGI: 1,
			INT: 4,
			WIS: 2,
			PER: 1,
			LUK: 1,
		});

		expect(getSpentStatPointCount({ STR: 2, HP: 3, AGI: 1, INT: 4, WIS: 2, PER: 1, LUK: 1 })).toBe(14);
		expect(upgraded.STR).toBe(12);
		expect(upgraded.AGI).toBe(11);
		expect(upgraded.INT).toBe(14);
		expect(upgraded.WIS).toBe(12);
		expect(upgraded.PER).toBe(11);
		expect(upgraded.LUK).toBe(11);
		expect(upgraded.HP).toBe(130);
		expect(upgraded.MP).toBe(100);
		expect(getWisdomExperienceMultiplier(upgraded.WIS)).toBe(1.06);
		expect(getIntelligenceUtilityMultiplier(upgraded.INT)).toBe(1.1);
	});

	it('uses a non-linear experience curve for leveling', () => {
		const xpForLevel2 = getExperienceForLevel(2);
		const xpForLevel3 = getExperienceForLevel(3);
		const xpForLevel4 = getExperienceForLevel(4);
		const xp3to4 = getExperienceToNextLevel(3);
		const xp4to5 = getExperienceToNextLevel(4);
		const xp5to6 = getExperienceToNextLevel(5);
		const xp8to9 = getExperienceToNextLevel(8);
		const xp9to10 = getExperienceToNextLevel(9);
		const xp10to11 = getExperienceToNextLevel(10);
		const xp13to14 = getExperienceToNextLevel(13);
		const xp14to15 = getExperienceToNextLevel(14);
		const xp18to19 = getExperienceToNextLevel(18);
		const xp19to20 = getExperienceToNextLevel(19);
		const fixedPoints = getStatPointsForLevel(4);
		const rewardPoints5 = getStatPointsForLevel(5);
		const rewardPoints10 = getStatPointsForLevel(10);

		expect(getExperienceForLevel(1)).toBe(0);
		expect(xpForLevel2).toBeGreaterThan(0);
		expect(xpForLevel4 - xpForLevel3).toBeGreaterThan(xpForLevel3 - xpForLevel2);
		expect(xp4to5).toBeLessThan(xp3to4);
		expect(xp4to5).toBeLessThan(xp5to6);
		expect(xp14to15).toBeLessThan(xp13to14);
		expect(xp9to10).toBeGreaterThan(xp8to9);
		expect(xp9to10).toBeGreaterThan(xp10to11);
		expect(xp19to20).toBeGreaterThan(xp18to19);
		expect(getLevelFromExperience(xpForLevel4)).toBe(4);
		expect(getStatPointsForLevel(1)).toBe(fixedPoints);
		expect(getStatPointsForLevel(7)).toBe(fixedPoints);
		expect(rewardPoints5).toBeGreaterThan(fixedPoints);
		expect(getStatPointsForLevel(15)).toBe(rewardPoints5);
		expect(rewardPoints10).toBeGreaterThan(rewardPoints5);
		expect(getTotalStatPointsForLevel(10)).toBeGreaterThan(getTotalStatPointsForLevel(9));
		expect(getAvailableStatPoints(10, 7, 3)).toBe(getTotalStatPointsForLevel(10) - 10);

		const exactXp = xpForLevel4 + 25.5;
		const progress = getExperienceProgress(exactXp);
		expect(progress.level).toBe(4);
		expect(progress.exactLevel).toBeGreaterThan(4);
		expect(progress.experienceIntoLevel).toBeCloseTo(25.5, 6);
		expect(progress.progress).toBeGreaterThan(0);
		expect(progress.progress).toBeLessThan(1);
		expect(xp4to5).toBe(Math.round(xp4to5 * 1000) / 1000);
		expect(progress.exactLevel).toBe(Math.round(progress.exactLevel * 1000) / 1000);
		expect(progress.progress).toBe(Math.round(progress.progress * 1000) / 1000);
		expect(getExperienceForLevel(4.5)).toBeGreaterThan(getExperienceForLevel(4));
		expect(getExperienceForLevel(4.5)).toBeLessThan(getExperienceForLevel(5));
		expect(getExperienceForLevel(4.5)).toBe(Math.round(getExperienceForLevel(4.5) * 1000) / 1000);
	});
});
