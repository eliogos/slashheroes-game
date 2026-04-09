import {
	axeWeapons,
	batteryWeapons,
	bladeWeapons,
	bluntWeapons,
	curved_bladeWeapons,
	firearmWeapons,
	fistWeapons,
	knifeWeapons,
	legendaryWeapons,
	miscWeapons,
	polearmWeapons,
	projectileWeapons,
	rangedWeapons,
	shieldWeapons,
	staffWeapons,
	throwableWeapons,
	weapons as weaponEntries,
} from './helpers/weaponEntries.js';
import {
	buildWeaponFamilyFlag,
	defineWeapon,
	familyConfigs,
	getPrimaryFamilyKey,
	getWeaponFamilyIds,
	getWeaponFamilyKeys,
	hasAnyWeaponFamily,
	normalizeWeaponFamilyIds,
	WEAPON_FAMILY,
	weaponFamilyIdByKey,
	weaponFamilyIds,
	weaponFamilyKeyById,
} from './helpers/index.js';
import type { ActiveWeaponDefinition, WeaponDefinition } from './helpers/index.js';

export {
	WEAPON_FAMILY,
	buildWeaponFamilyFlag,
	defineWeapon,
	familyConfigs,
	getPrimaryFamilyKey,
	getWeaponFamilyIds,
	getWeaponFamilyKeys,
	hasAnyWeaponFamily,
	normalizeWeaponFamilyIds,
	weaponFamilyIdByKey,
	weaponFamilyIds,
	weaponFamilyKeyById,
};
export * from './helpers/index.js';
export {
	axeWeapons,
	batteryWeapons,
	bladeWeapons,
	bluntWeapons,
	curved_bladeWeapons,
	firearmWeapons,
	fistWeapons,
	knifeWeapons,
	legendaryWeapons,
	miscWeapons,
	polearmWeapons,
	projectileWeapons,
	rangedWeapons,
	shieldWeapons,
	staffWeapons,
	throwableWeapons,
};

export const weapons: WeaponDefinition[] = [...weaponEntries];
export const activeWeapons: ActiveWeaponDefinition[] = weapons.filter((weapon) => !weapon.archived) as ActiveWeaponDefinition[];

export function getWeaponById(id: string): ActiveWeaponDefinition | null {
	return activeWeapons.find((weapon) => weapon.id === id) ?? null;
}
