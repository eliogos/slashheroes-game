import { SPOILAGE_STATE, type SpoilageState } from './constants.js';

export const DEFAULT_NEUTRAL_TEMPERATURE_C = 20;
export const DEFAULT_HEAT_SENSITIVITY = 0.03;

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export interface BaseSpoilageOptions {
	actionsPassed?: number;
	decayAction?: number;
	temperatureC?: number;
	neutralTemperatureC?: number;
	heatSensitivity?: number;
	minHeatMultiplier?: number;
	maxHeatMultiplier?: number;
}

export interface SpoilageTickResult {
	baseSpoilage: number;
	heatMultiplier: number;
	actionsLeft: number;
	freshnessRatio: number;
	spoilageState: SpoilageState;
	spoiled: boolean;
}

export function getHeatMultiplier(
	temperatureC = DEFAULT_NEUTRAL_TEMPERATURE_C,
	neutralTemperatureC = DEFAULT_NEUTRAL_TEMPERATURE_C,
	heatSensitivity = DEFAULT_HEAT_SENSITIVITY,
	minHeatMultiplier = 0.25,
	maxHeatMultiplier = 2,
): number {
	const rawMultiplier = 1 + ((temperatureC - neutralTemperatureC) * heatSensitivity);
	return clamp(rawMultiplier, minHeatMultiplier, maxHeatMultiplier);
}

export function getBaseSpoilage(options: BaseSpoilageOptions = {}): number {
	const actionsPassed = Math.max(options.actionsPassed ?? options.decayAction ?? 1, 0);
	const heatMultiplier = getHeatMultiplier(
		options.temperatureC,
		options.neutralTemperatureC,
		options.heatSensitivity,
		options.minHeatMultiplier,
		options.maxHeatMultiplier,
	);

	return actionsPassed * heatMultiplier;
}

export function getSpoilageState(actionsLeft: number, decay: number): SpoilageState {
	if (decay <= 0 || actionsLeft <= 0) {
		return SPOILAGE_STATE.ROTTEN;
	}

	const freshnessRatio = clamp(actionsLeft / decay, 0, 1);

	if (freshnessRatio > 0.75) {
		return SPOILAGE_STATE.FRESH;
	}

	if (freshnessRatio > 0.5) {
		return SPOILAGE_STATE.AGING;
	}

	if (freshnessRatio > 0.25) {
		return SPOILAGE_STATE.STALE;
	}

	return SPOILAGE_STATE.SPOILED;
}

export function applySpoilageTick(
	decay: number,
	currentActionsLeft = decay,
	options: BaseSpoilageOptions = {},
): SpoilageTickResult {
	const maxDecay = Math.max(decay, 0);
	const heatMultiplier = getHeatMultiplier(
		options.temperatureC,
		options.neutralTemperatureC,
		options.heatSensitivity,
		options.minHeatMultiplier,
		options.maxHeatMultiplier,
	);
	const baseSpoilage = getBaseSpoilage(options);
	const actionsLeft = clamp(currentActionsLeft - baseSpoilage, 0, maxDecay);
	const freshnessRatio = maxDecay <= 0 ? 0 : clamp(actionsLeft / maxDecay, 0, 1);
	const spoilageState = getSpoilageState(actionsLeft, maxDecay);

	return {
		baseSpoilage,
		heatMultiplier,
		actionsLeft,
		freshnessRatio,
		spoilageState,
		spoiled: spoilageState === SPOILAGE_STATE.ROTTEN || spoilageState === SPOILAGE_STATE.SPOILED,
	};
}
