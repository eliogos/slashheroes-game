import { EPSILON, STAT_DECIMAL_PLACES } from '../../../helpers/constants.js';

export const BASELINE_CORE_STAT = 10;
export const BASELINE_RESOURCE_POOL = 100;

export function roundToStatPrecision(value: number): number {
	const factor = 10 ** STAT_DECIMAL_PLACES;
	const adjustment = value >= 0 ? EPSILON : -EPSILON;
	return Math.round((value + adjustment) * factor) / factor;
}

export function normalizeStat(value: number, fallback = BASELINE_CORE_STAT): number {
	return Number.isFinite(value) ? value : fallback;
}

export function normalizeResource(value: number, fallback = BASELINE_RESOURCE_POOL): number {
	return Number.isFinite(value) ? value : fallback;
}
