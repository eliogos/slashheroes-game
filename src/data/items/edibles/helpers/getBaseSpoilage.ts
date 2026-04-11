import { divide } from 'mathjs';
import { Temperature, TemperatureDelta } from 'unitsnet-js';

import { SPOILAGE_STATE, type SpoilageState } from './constants.js';

// ====================
// Constants
// ====================

export const SPOILAGE_DEFAULTS: Readonly<{
	neutralTemperatureC: number;
	heatSensitivityStepC: number;
	heatSensitivity: number;
	minHeatMultiplier: number;
	maxHeatMultiplier: number;
}> = {
	neutralTemperatureC: Temperature.FromKelvins(293.15).DegreesCelsius,
	heatSensitivityStepC: TemperatureDelta.FromKelvins(1).DegreesCelsius,
	heatSensitivity: Number(divide(3, 100)),
	minHeatMultiplier: Number(divide(25, 100)),
	maxHeatMultiplier: 2,
};

export const SPOILAGE_THRESHOLDS: Readonly<{
	fresh: number;
	aging: number;
	stale: number;
}> = {
	fresh: Number(divide(75, 100)),
	aging: Number(divide(50, 100)),
	stale: Number(divide(25, 100)),
};

export const DEFAULT_NEUTRAL_TEMPERATURE_C = SPOILAGE_DEFAULTS.neutralTemperatureC;
export const DEFAULT_NEUTRAL_TEMPERATURE = DEFAULT_NEUTRAL_TEMPERATURE_C;
export const DEFAULT_HEAT_SENSITIVITY_STEP_C = SPOILAGE_DEFAULTS.heatSensitivityStepC;

/**
 * Spoilage multiplier gained per +1°C above the neutral temperature.
 * Kelvin is used for semantic authoring; Celsius is used as it already offers a normalized value from 0 to 100+.
 */
export const DEFAULT_HEAT_SENSITIVITY = SPOILAGE_DEFAULTS.heatSensitivity;

const SPOILED_STATES: readonly SpoilageState[] = [
	SPOILAGE_STATE.ROTTEN,
	SPOILAGE_STATE.SPOILED,
];

// ====================
// Helpers
// ====================

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}


function getElapsedActions(actionsPassed?: number, decayAction?: number): number {
	return Math.max(actionsPassed ?? decayAction ?? 1, 0);
}


function getSpoilageAmount(elapsedActions: number, heatMultiplier: number): number {
	return elapsedActions * heatMultiplier;
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

// ====================
// Core calculations
// ====================

export function getHeatMultiplier(
	temperatureC = SPOILAGE_DEFAULTS.neutralTemperatureC,
	neutralTemperatureC = SPOILAGE_DEFAULTS.neutralTemperatureC,
	heatSensitivity = SPOILAGE_DEFAULTS.heatSensitivity,
	minHeatMultiplier = SPOILAGE_DEFAULTS.minHeatMultiplier,
	maxHeatMultiplier = SPOILAGE_DEFAULTS.maxHeatMultiplier,
): number {
	const temperatureDeltaC = TemperatureDelta.FromDegreesCelsius(
		temperatureC - neutralTemperatureC,
	).DegreesCelsius;

	const heatSteps = temperatureDeltaC / SPOILAGE_DEFAULTS.heatSensitivityStepC;
	const rawMultiplier = 1 + heatSteps * heatSensitivity;

	return clamp(rawMultiplier, minHeatMultiplier, maxHeatMultiplier);
}


export function getBaseSpoilage(options: BaseSpoilageOptions = {}): number {
	const {
		actionsPassed,
		decayAction,
		temperatureC,
		neutralTemperatureC,
		heatSensitivity,
		minHeatMultiplier,
		maxHeatMultiplier,
	} = options;

	const elapsedActions = getElapsedActions(actionsPassed, decayAction);
	const heatMultiplier = getHeatMultiplier(
		temperatureC,
		neutralTemperatureC,
		heatSensitivity,
		minHeatMultiplier,
		maxHeatMultiplier,
	);

	return getSpoilageAmount(elapsedActions, heatMultiplier);
}


export function getSpoilageState(
	remainingFreshness: number,
	maxFreshness: number,
): SpoilageState {
	if (maxFreshness <= 0 || remainingFreshness <= 0) {
		return SPOILAGE_STATE.ROTTEN;
	}

	const freshnessRatio = clamp(remainingFreshness / maxFreshness, 0, 1);

	if (freshnessRatio > SPOILAGE_THRESHOLDS.fresh) {
		return SPOILAGE_STATE.FRESH;
	}

	if (freshnessRatio > SPOILAGE_THRESHOLDS.aging) {
		return SPOILAGE_STATE.AGING;
	}

	if (freshnessRatio > SPOILAGE_THRESHOLDS.stale) {
		return SPOILAGE_STATE.STALE;
	}

	return SPOILAGE_STATE.SPOILED;
}


export function applySpoilageTick(
	decay: number,
	currentActionsLeft = decay,
	options: BaseSpoilageOptions = {},
): SpoilageTickResult {
	const {
		actionsPassed,
		decayAction,
		temperatureC,
		neutralTemperatureC,
		heatSensitivity,
		minHeatMultiplier,
		maxHeatMultiplier,
	} = options;

	const maxFreshness = Math.max(decay, 0);
	const elapsedActions = getElapsedActions(actionsPassed, decayAction);
	const heatMultiplier = getHeatMultiplier(
		temperatureC,
		neutralTemperatureC,
		heatSensitivity,
		minHeatMultiplier,
		maxHeatMultiplier,
	);
	const baseSpoilage = getSpoilageAmount(elapsedActions, heatMultiplier);
	const actionsLeft = clamp(currentActionsLeft - baseSpoilage, 0, maxFreshness);
	const freshnessRatio = maxFreshness <= 0 ? 0 : clamp(actionsLeft / maxFreshness, 0, 1);
	const spoilageState = getSpoilageState(actionsLeft, maxFreshness);
	const spoiled = SPOILED_STATES.includes(spoilageState);

	return {
		baseSpoilage,
		heatMultiplier,
		actionsLeft,
		freshnessRatio,
		spoilageState,
		spoiled,
	};
}
