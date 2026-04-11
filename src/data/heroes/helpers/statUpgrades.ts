import { EPSILON, STAT_DECIMAL_PLACES } from '../../helpers/constants.js';
import type { ComputedHeroStats } from '../types.js';

export const UPGRADABLE_HERO_STAT_RULES = {
	STR: {
		label: 'Strength',
		mode: 'flat',
		valuePerPoint: 1,
		summary: 'Each point adds +1 Strength for carrying power and heavy-hit scaling.',
	},
	HP: {
		label: 'Health',
		mode: 'percent',
		valuePerPoint: 0.1,
		summary: 'Each point adds +10% to max health from the current base HP value.',
	},
	AGI: {
		label: 'Agility',
		mode: 'flat',
		valuePerPoint: 1,
		summary: 'Each point adds +1 Agility for evasion, attack speed, and stamina efficiency.',
	},
	INT: {
		label: 'Intelligence',
		mode: 'flat',
		valuePerPoint: 1,
		summary: 'Each point adds +1 Intelligence for utility, analysis, and skill efficiency systems.',
	},
	WIS: {
		label: 'Wisdom',
		mode: 'flat',
		valuePerPoint: 1,
		summary: 'Each point adds +1 Wisdom for experience gain and spiritual scaling.',
	},
	PER: {
		label: 'Perception',
		mode: 'flat',
		valuePerPoint: 1,
		summary: 'Each point adds +1 Perception for awareness, accuracy, and detection.',
	},
	LUK: {
		label: 'Luck',
		mode: 'flat',
		valuePerPoint: 1,
		summary: 'Each point adds +1 Luck for drops, proc odds, and favorable outcomes.',
	},
} as const;

export type UpgradableHeroStatShortcode = keyof typeof UPGRADABLE_HERO_STAT_RULES;
export type HeroStatPointAllocation = Partial<Record<UpgradableHeroStatShortcode, number>>;

type UpgradeRule = (typeof UPGRADABLE_HERO_STAT_RULES)[UpgradableHeroStatShortcode];

function roundToStatPrecision(value: number): number {
	const factor = 10 ** STAT_DECIMAL_PLACES;
	const adjustment = value >= 0 ? EPSILON : -EPSILON;
	return Math.round((value + adjustment) * factor) / factor;
}

function normalizePointCount(points: number | undefined): number {
	if (!Number.isFinite(points)) {
		return 0;
	}

	return Math.max(0, Math.floor((points ?? 0) + EPSILON));
}

export function isUpgradableHeroStat(stat: string): stat is UpgradableHeroStatShortcode {
	return stat in UPGRADABLE_HERO_STAT_RULES;
}

export function getSpentStatPointCount(allocation: HeroStatPointAllocation = {}): number {
	return Object.values(allocation).reduce((total, points) => total + normalizePointCount(points), 0);
}

function applyUpgradeRule(currentValue: number, points: number, rule: UpgradeRule): number {
	if (points <= 0) {
		return roundToStatPrecision(currentValue);
	}

	if (rule.mode === 'percent') {
		return roundToStatPrecision(currentValue * (1 + (rule.valuePerPoint * points)));
	}

	return roundToStatPrecision(currentValue + (rule.valuePerPoint * points));
}

export function applyStatPointAllocation(
	stats: ComputedHeroStats,
	allocation: HeroStatPointAllocation = {},
): ComputedHeroStats {
	const updated = { ...stats };

	for (const [stat, rawPoints] of Object.entries(allocation)) {
		if (!isUpgradableHeroStat(stat)) {
			continue;
		}

		const points = normalizePointCount(rawPoints);
		updated[stat] = applyUpgradeRule(updated[stat], points, UPGRADABLE_HERO_STAT_RULES[stat]);
	}

	return updated;
}

export function getWisdomExperienceMultiplier(wisdom: number, baseline = 10): number {
	const safeWisdom = Number.isFinite(wisdom) ? wisdom : baseline;
	return roundToStatPrecision(Math.max(0.25, 1 + ((safeWisdom - baseline) * 0.03)));
}

export function getIntelligenceUtilityMultiplier(intelligence: number, baseline = 10): number {
	const safeIntelligence = Number.isFinite(intelligence) ? intelligence : baseline;
	return roundToStatPrecision(Math.max(0.5, 1 + ((safeIntelligence - baseline) * 0.025)));
}
