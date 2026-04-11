import { EPSILON, STAT_DECIMAL_PLACES } from '../../helpers/constants.js';

export const LEVELING_CURVE = {
	baseXp: 45,
	linearFactor: 18,
	powerFactor: 12,
	growthExponent: 1.45,
	milestoneCycle: 10,
	milestoneAmplitude: 0.35,
	milestonePower: 5,
	maxLevel: 100,
} as const;

export const STAT_POINT_CURVE = {
	basePointsPerLevel: 2,
	bonusAtFive: 1,
	bonusAtTen: 2,
	pulsePower: 30,
} as const;

export interface ExperienceProgress {
	level: number;
	exactLevel: number;
	currentLevelExperience: number;
	nextLevelExperience: number;
	experienceIntoLevel: number;
	experienceForNextLevel: number;
	progress: number;
}

export interface StatPointProgress {
	level: number;
	awardedOnLevel: number;
	totalEarned: number;
	spentPoints: number;
	reservedPoints: number;
	availablePoints: number;
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function roundToStatPrecision(value: number): number {
	const factor = 10 ** STAT_DECIMAL_PLACES;
	const adjustment = value >= 0 ? EPSILON : -EPSILON;
	return Math.round((value + adjustment) * factor) / factor;
}

function toSafePositiveNumber(value: number, fallback: number): number {
	return Number.isFinite(value) ? Math.max(fallback, value) : fallback;
}

/**
 * Repeating milestone modifier with no milestone-specific branching:
 * - levels ending in 5 get a breather
 * - levels ending in 10 get a spike
 */
function getMilestoneModifier(targetLevel: number): number {
	const angle = (2 * Math.PI * targetLevel) / LEVELING_CURVE.milestoneCycle;
	const cosine = Math.cos(angle);
	const milestoneWave = Math.sign(cosine) * (Math.abs(cosine) ** LEVELING_CURVE.milestonePower);

	return 1 + (LEVELING_CURVE.milestoneAmplitude * milestoneWave);
}

function getMilestonePulse(level: number, cycle: number): number {
	const cosineBand = (1 + Math.cos((2 * Math.PI * level) / cycle)) / 2;
	return cosineBand ** STAT_POINT_CURVE.pulsePower;
}

export function getStatPointsForLevel(level: number): number {
	const safeLevel = Math.max(1, Math.floor(toSafePositiveNumber(level, 1) + EPSILON));
	const fiveLevelPulse = getMilestonePulse(safeLevel, 5);
	const tenLevelPulse = getMilestonePulse(safeLevel, 10);

	return Math.max(
		0,
		Math.round(
			STAT_POINT_CURVE.basePointsPerLevel
			+ (STAT_POINT_CURVE.bonusAtFive * fiveLevelPulse)
			+ (STAT_POINT_CURVE.bonusAtTen * tenLevelPulse),
		),
	);
}

export function getTotalStatPointsForLevel(level: number): number {
	const safeLevel = Math.max(1, Math.floor(toSafePositiveNumber(level, 1) + EPSILON));

	return Array.from({ length: safeLevel }, (_, index) => getStatPointsForLevel(index + 1))
		.reduce((total, points) => total + points, 0);
}

export function getAvailableStatPoints(level: number, spentPoints = 0, reservedPoints = 0): number {
	const safeSpentPoints = Math.max(0, Math.floor(toSafePositiveNumber(spentPoints, 0) + EPSILON));
	const safeReservedPoints = Math.max(0, Math.floor(toSafePositiveNumber(reservedPoints, 0) + EPSILON));
	const totalEarned = getTotalStatPointsForLevel(level);

	return Math.max(0, totalEarned - safeSpentPoints - safeReservedPoints);
}

export function getStatPointProgress(level: number, spentPoints = 0, reservedPoints = 0): StatPointProgress {
	const safeLevel = Math.max(1, Math.floor(toSafePositiveNumber(level, 1) + EPSILON));
	const safeSpentPoints = Math.max(0, Math.floor(toSafePositiveNumber(spentPoints, 0) + EPSILON));
	const safeReservedPoints = Math.max(0, Math.floor(toSafePositiveNumber(reservedPoints, 0) + EPSILON));
	const totalEarned = getTotalStatPointsForLevel(safeLevel);

	return {
		level: safeLevel,
		awardedOnLevel: getStatPointsForLevel(safeLevel),
		totalEarned,
		spentPoints: safeSpentPoints,
		reservedPoints: safeReservedPoints,
		availablePoints: Math.max(0, totalEarned - safeSpentPoints - safeReservedPoints),
	};
}

function getRawExperienceToNextLevel(level: number): number {
	const safeLevel = toSafePositiveNumber(level, 1);
	const targetLevel = safeLevel + 1;
	const baseStepExperience = LEVELING_CURVE.baseXp
		+ (LEVELING_CURVE.linearFactor * safeLevel)
		+ (LEVELING_CURVE.powerFactor * (safeLevel ** LEVELING_CURVE.growthExponent));

	return Math.max(EPSILON, baseStepExperience * getMilestoneModifier(targetLevel));
}

/** Experience needed to advance from the current level to the next one. */
export function getExperienceToNextLevel(level: number): number {
	return roundToStatPrecision(getRawExperienceToNextLevel(level));
}

function getRawExperienceForLevel(level: number): number {
	const safeLevel = toSafePositiveNumber(level, 1);
	const completedLevels = Math.max(1, Math.floor(safeLevel + EPSILON));
	const levelsToGain = Math.max(0, completedLevels - 1);
	const completedExperience = Array.from({ length: levelsToGain }, (_, index) => getRawExperienceToNextLevel(index + 1))
		.reduce((total, requiredXp) => total + requiredXp, 0);
	const fractionalProgress = clamp(safeLevel - completedLevels, 0, 1);

	if (fractionalProgress <= EPSILON) {
		return completedExperience;
	}

	return completedExperience + (getRawExperienceToNextLevel(completedLevels) * fractionalProgress);
}

/** Total accumulated experience required to reach a given level. Allows fractional interpolation within a level. */
export function getExperienceForLevel(level: number): number {
	return roundToStatPrecision(getRawExperienceForLevel(level));
}

function getRawExactLevelFromExperience(experience: number, maxLevel: number = LEVELING_CURVE.maxLevel): number {
	const safeExperience = toSafePositiveNumber(experience, 0);
	const safeMaxLevel = toSafePositiveNumber(maxLevel, 1);
	const cappedMaxLevel = Math.max(1, Math.floor(safeMaxLevel + EPSILON));
	let wholeLevel = 1;

	while (wholeLevel < cappedMaxLevel && getRawExperienceForLevel(wholeLevel + 1) <= safeExperience + EPSILON) {
		wholeLevel += 1;
	}

	if (wholeLevel >= cappedMaxLevel) {
		return cappedMaxLevel;
	}

	const currentLevelExperience = getRawExperienceForLevel(wholeLevel);
	const experienceForNextLevel = Math.max(EPSILON, getRawExperienceToNextLevel(wholeLevel));
	const fractionalProgress = clamp((safeExperience - currentLevelExperience) / experienceForNextLevel, 0, 1);

	return Math.min(cappedMaxLevel, wholeLevel + fractionalProgress);
}

/** Returns the precise fractional level derived from an accumulated experience total. */
export function getExactLevelFromExperience(experience: number, maxLevel: number = LEVELING_CURVE.maxLevel): number {
	return roundToStatPrecision(getRawExactLevelFromExperience(experience, maxLevel));
}

/** Derives the current whole level from an accumulated experience total. */
export function getLevelFromExperience(experience: number, maxLevel: number = LEVELING_CURVE.maxLevel): number {
	return Math.floor(getRawExactLevelFromExperience(experience, maxLevel) + EPSILON);
}

/** Returns current level progress details for UI bars, summaries, and reward pacing. */
export function getExperienceProgress(experience: number, maxLevel: number = LEVELING_CURVE.maxLevel): ExperienceProgress {
	const safeExperience = toSafePositiveNumber(experience, 0);
	const safeMaxLevel = toSafePositiveNumber(maxLevel, 1);
	const exactLevel = getRawExactLevelFromExperience(safeExperience, safeMaxLevel);
	const level = Math.floor(exactLevel + EPSILON);
	const cappedMaxLevel = Math.max(1, Math.floor(safeMaxLevel + EPSILON));
	const currentLevelExperience = getRawExperienceForLevel(level);
	const nextLevelExperience = level >= cappedMaxLevel
		? currentLevelExperience
		: getRawExperienceForLevel(level + 1);
	const experienceForNextLevel = Math.max(EPSILON, nextLevelExperience - currentLevelExperience);
	const experienceIntoLevel = level >= cappedMaxLevel ? 0 : safeExperience - currentLevelExperience;
	const progress = level >= cappedMaxLevel
		? 1
		: clamp(experienceIntoLevel / experienceForNextLevel, 0, 1);

	return {
		level,
		exactLevel: roundToStatPrecision(exactLevel),
		currentLevelExperience: roundToStatPrecision(currentLevelExperience),
		nextLevelExperience: roundToStatPrecision(nextLevelExperience),
		experienceIntoLevel: roundToStatPrecision(experienceIntoLevel),
		experienceForNextLevel: roundToStatPrecision(experienceForNextLevel),
		progress: roundToStatPrecision(progress),
	};
}
