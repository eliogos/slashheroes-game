import { WEAPON_FAMILY } from '../../../helpers/constants.js';

export { WEAPON_FAMILY };
export const WEAPONS = WEAPON_FAMILY;
export const {
	AXE,
	BATTERY,
	BLADE,
	BLUNT,
	CURVED_BLADE,
	FIREARM,
	FIST,
	KNIFE,
	LEGENDARY,
	MISC,
	POLEARM,
	PROJECTILE,
	RANGED,
	SHIELD,
	STAFF,
	TOOL,
	THROWABLE,
} = WEAPON_FAMILY;

export { defineWeapon } from './defineWeapon.js';
export { getDamageRange } from './damageVariance.js';
export { getBaseDamage } from './getBaseDamage.js';
export { normalizeQualities } from './normalizeQualities.js';
export {
	resolveFamilyDamageProfile,
	resolveFamilyQualities,
	THROWABLE_BASE_QUALITY_BONUS,
} from './resolveFamilyQualities.js';
export { applyTierScaling, getTierMultiplier } from './tierScaling.js';
export {
	buildWeaponFamilyFlag,
	familyConfigs,
	getPrimaryFamilyKey,
	getWeaponFamilyIds,
	getWeaponFamilyKeys,
	hasAnyWeaponFamily,
	normalizeWeaponFamilyIds,
	weaponFamilyIdByKey,
	weaponFamilyIds,
	weaponFamilyKeyById,
} from './familyConfigs.js';
export type {
	ActiveWeaponDefinition,
	WeaponDamageProfile,
	WeaponDefinition,
	WeaponEffect,
	WeaponFamilyDefinition,
	WeaponQualityMultipliers,
	WeaponQualitySet,
} from './types.js';
export type { NormalizedWeaponQualities } from './normalizeQualities.js';
