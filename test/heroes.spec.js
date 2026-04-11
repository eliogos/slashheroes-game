import { describe, expect, it } from 'vitest';
import {
	applyStatPointAllocation,
	computeHeroStats,
	defineHero,
	defineRace,
	getAvailableStatPoints,
	getExperienceForLevel,
	getExperienceProgress,
	getExperienceToNextLevel,
	getIntelligenceUtilityMultiplier,
	getLevelFromExperience,
	getSpentStatPointCount,
	getStatPointsForLevel,
	getTotalStatPointsForLevel,
	getWisdomExperienceMultiplier,
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
