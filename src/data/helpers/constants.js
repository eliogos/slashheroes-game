import { Mass } from "unitsnet-js";

export const EPSILON = 1e-9;		// 0.000000001 (Prevents division by zero)
export const STAT_DECIMAL_PLACES = 3;	// Exposed gameplay values are rounded to at most 3 decimals
export const DEFAULT_DAMAGE_WEIGHTS   = { weight: Mass.FromCentigrams(25).Grams, speed: 0.30, edge: 0.30, reach: 0.15 };
export const DEFAULT_EVASION_WEIGHTS = { elasticity: 0.60, weight: 0.40 };
export const DEFAULT_ELASTICITY_REFERENCE_PA = 1e9;
export const DEFAULT_ITEM_WEIGHT_KG = 10;
export const DEFAULT_TRACTION_COEFFICIENT = 1.0;
export const DEFAULT_CRIT_PRESSURE_PA = 1.2e7;
export const BASE_MULTIPLIER = 100;
export const WEAPON_FAMILY = Object.freeze({
	AXE: 1 << 0,
	BATTERY: 1 << 1,
	BLADE: 1 << 2,
	BLUNT: 1 << 3,
	CURVED_BLADE: 1 << 4,
	FIREARM: 1 << 5,
	FIST: 1 << 6,
	KNIFE: 1 << 7,
	LEGENDARY: 1 << 8,
	MISC: 1 << 9,
	POLEARM: 1 << 10,
	PROJECTILE: 1 << 11,
	RANGED: 1 << 12,
	SHIELD: 1 << 13,
	STAFF: 1 << 14,
	TOOL: 1 << 15,
	THROWABLE: 1 << 16,
});
