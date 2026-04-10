import { SATIATION_TYPE, type SatiationType } from './constants.js';

export const DEFAULT_HUNGER_MAX = 100;
export const DEFAULT_HUMAN_ENERGY_MAX_KCAL = 2250;
export const DEFAULT_LOW_HUNGER_THRESHOLD = 25;

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export interface BaseSatiationOptions {
	energyMaxKcal?: number;
	hungerMax?: number;
}

export interface SatiationDistributionOptions extends BaseSatiationOptions {
	type?: SatiationType;
	currentHunger?: number;
	durationActions?: number;
	delayActions?: number;
	thresholdHunger?: number;
	thresholdMultiplier?: number;
	synergyMultiplier?: number;
	comboCount?: number;
	comboStepMultiplier?: number;
	bufferRatio?: number;
	slowburnActions?: number;
	slowburnDrainMultiplier?: number;
	boostActions?: number;
}

export interface SatiationDistribution {
	type: SatiationType;
	effectiveKcal: number;
	baseSatiation: number;
	immediateSatiation: number;
	perActionSatiation: number;
	delayedSatiation: number;
	delayActions: number;
	durationActions: number;
	reserveSatiation: number;
	hungerDrainMultiplier: number;
	bonusActions: number;
	bonusIntensity: number;
}

export function energyKcalFromHunger(
	currentHunger: number,
	energyMaxKcal = DEFAULT_HUMAN_ENERGY_MAX_KCAL,
	hungerMax = DEFAULT_HUNGER_MAX,
): number {
	return clamp(currentHunger, 0, hungerMax) / hungerMax * energyMaxKcal;
}

export function hungerFromEnergyKcal(
	currentEnergyKcal: number,
	energyMaxKcal = DEFAULT_HUMAN_ENERGY_MAX_KCAL,
	hungerMax = DEFAULT_HUNGER_MAX,
): number {
	if (energyMaxKcal <= 0) {
		return 0;
	}

	return clamp(currentEnergyKcal, 0, energyMaxKcal) / energyMaxKcal * hungerMax;
}

export function getEffectiveSatiationKcal(
	baseKcal: number,
	options: Pick<
		SatiationDistributionOptions,
		'type' | 'currentHunger' | 'thresholdHunger' | 'thresholdMultiplier' | 'synergyMultiplier' | 'comboCount' | 'comboStepMultiplier'
	> = {},
): number {
	const type = options.type ?? SATIATION_TYPE.INSTANT;
	const currentHunger = options.currentHunger ?? DEFAULT_HUNGER_MAX;

	let effectiveKcal = baseKcal;

	if (type === SATIATION_TYPE.THRESHOLD && currentHunger <= (options.thresholdHunger ?? DEFAULT_LOW_HUNGER_THRESHOLD)) {
		effectiveKcal *= options.thresholdMultiplier ?? 1.25;
	}

	if (type === SATIATION_TYPE.SYNERGY) {
		effectiveKcal *= options.synergyMultiplier ?? 1.15;
	}

	if (type === SATIATION_TYPE.COMBO) {
		effectiveKcal *= 1 + Math.max(options.comboCount ?? 0, 0) * (options.comboStepMultiplier ?? 0.1);
	}

	return effectiveKcal;
}

export function getBaseSatiation(
	satiationKcal: number,
	options: BaseSatiationOptions = {},
): number {
	const hungerMax = options.hungerMax ?? DEFAULT_HUNGER_MAX;
	const energyMaxKcal = options.energyMaxKcal ?? DEFAULT_HUMAN_ENERGY_MAX_KCAL;

	if (energyMaxKcal <= 0 || hungerMax <= 0) {
		return 0;
	}

	return Math.round((satiationKcal / energyMaxKcal) * hungerMax);
}

export function getSatiationDistribution(
	satiationKcal: number,
	options: SatiationDistributionOptions = {},
): SatiationDistribution {
	const type = options.type ?? SATIATION_TYPE.INSTANT;
	const effectiveKcal = getEffectiveSatiationKcal(satiationKcal, options);
	const baseSatiation = getBaseSatiation(effectiveKcal, options);

	let immediateSatiation = baseSatiation;
	let perActionSatiation = 0;
	let delayedSatiation = 0;
	let delayActions = 0;
	let durationActions = Math.max(Math.floor(options.durationActions ?? 3), 1);
	let reserveSatiation = 0;
	let bonusActions = 0;
	let bonusIntensity = 0;
	let hungerDrainMultiplier = 1;

	switch (type) {
		case SATIATION_TYPE.STEADY: {
			const share = baseSatiation / (durationActions + 1);
			immediateSatiation = share;
			perActionSatiation = share;
			break;
		}
		case SATIATION_TYPE.SLOWBURN:
			immediateSatiation = baseSatiation;
			durationActions = Math.max(Math.floor(options.slowburnActions ?? durationActions), 1);
			hungerDrainMultiplier = clamp(options.slowburnDrainMultiplier ?? 0.75, 0.1, 1);
			break;
		case SATIATION_TYPE.DELAYED:
			immediateSatiation = 0;
			delayedSatiation = baseSatiation;
			delayActions = Math.max(Math.floor(options.delayActions ?? durationActions), 1);
			break;
		case SATIATION_TYPE.BUFFER: {
			const bufferRatio = clamp(options.bufferRatio ?? 0.25, 0, 0.9);
			reserveSatiation = baseSatiation * bufferRatio;
			immediateSatiation = baseSatiation - reserveSatiation;
			break;
		}
		case SATIATION_TYPE.BOOST:
			immediateSatiation = baseSatiation;
			bonusActions = Math.max(Math.floor(options.boostActions ?? durationActions), 1);
			bonusIntensity = Math.max(1, Math.round(baseSatiation / 5));
			break;
		default:
			immediateSatiation = baseSatiation;
			break;
	}

	return {
		type,
		effectiveKcal,
		baseSatiation,
		immediateSatiation,
		perActionSatiation,
		delayedSatiation,
		delayActions,
		durationActions,
		reserveSatiation,
		hungerDrainMultiplier,
		bonusActions,
		bonusIntensity,
	};
}
