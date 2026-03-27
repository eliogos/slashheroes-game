export const EPSILON = 1e-6;		// 0.000001 (Prevents division by zero)
export const DEFAULT_DAMAGE_WEIGHTS = { weight: 0.25, speed: 0.30, edge: 0.30, reach: 0.15 };
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
});
