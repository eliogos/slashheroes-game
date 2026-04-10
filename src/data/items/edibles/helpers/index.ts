export {
	EDIBLE_SUBTYPE,
	SATIATION_TYPE,
	SPOILAGE_STATE,
	edibleSubtypeIds,
	satiationTypeDefinitions,
	satiationTypeDescriptions,
	satiationTypeIds,
	spoilageStateIds,
} from './constants.js';
export { defineEdible } from './defineEdible.js';
export {
	DEFAULT_HUMAN_ENERGY_MAX_KCAL,
	DEFAULT_HUNGER_MAX,
	DEFAULT_LOW_HUNGER_THRESHOLD,
	energyKcalFromHunger,
	getBaseSatiation,
	getEffectiveSatiationKcal,
	getSatiationDistribution,
	hungerFromEnergyKcal,
} from './getBaseSatiation.js';
export {
	DEFAULT_HEAT_SENSITIVITY,
	DEFAULT_NEUTRAL_TEMPERATURE_C,
	applySpoilageTick,
	getBaseSpoilage,
	getHeatMultiplier,
	getSpoilageState,
} from './getBaseSpoilage.js';
export type {
	EdibleSubtype,
	SatiationType,
	SpoilageState,
} from './constants.js';
export type {
	BaseSatiationOptions,
	SatiationDistribution,
	SatiationDistributionOptions,
} from './getBaseSatiation.js';
export type {
	BaseSpoilageOptions,
	SpoilageTickResult,
} from './getBaseSpoilage.js';
export type {
	ActiveEdibleDefinition,
	EdibleDefinition,
	EdibleEffect,
	EdibleLocalization,
	EdibleLocalizationEntry,
} from './types.js';
