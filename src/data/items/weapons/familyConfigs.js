import { convertWeaponUnits } from '../../helpers/convertWeaponUnits.js';
import { WEAPON_FAMILY } from '../../helpers/constants.js';

function defineFamily(id, key, description, qualities, damageProfile = null) {
	return {
		id,
		key,
		description,
		qualities: convertWeaponUnits(qualities),
		damageProfile
	};
}

const familyEntries = [
	defineFamily(
		WEAPON_FAMILY.AXE,
		'AXE',
		'Heavy and slow, strong impact with moderate randomness.',
		{ weight: 3.4, speed: 5.4, edge: 14, reach: 1.1, curvature: 6 }
	),
	defineFamily(
		WEAPON_FAMILY.BATTERY,
		'BATTERY',
		'Powered weapons relying on energy and weaker without a charge source.',
		{ weight: 1.7, speed: 8.2, edge: 8, reach: 1.0, curvature: 4 }
	),
	defineFamily(
		WEAPON_FAMILY.BLADE,
		'BLADE',
		'Balanced weapons with consistent performance.',
		{ weight: 1.6, speed: 8.8, edge: 12, reach: 1.0, curvature: 10 }
	),
	defineFamily(
		WEAPON_FAMILY.BLUNT,
		'BLUNT',
		'Heavy impact weapons that swing slower and hit with raw force.',
		{ weight: 4.2, speed: 4.6, edge: 2, reach: 1.05, curvature: 0 },
		{ weight: 0.95, speed: 0.01, edge: 0.03, reach: 0.2 }
	),
	defineFamily(
		WEAPON_FAMILY.CURVED_BLADE,
		'CURVED_BLADE',
		'Most precise weapons, favoring controlled and consistent strikes.',
		{ weight: 1.5, speed: 9.4, edge: 13, reach: 1.0, curvature: 22 }
	),
	defineFamily(
		WEAPON_FAMILY.FIREARM,
		'FIREARM',
		'Amplifies ammo power and speed, but feels weak without ammunition.',
		{ weight: 2.8, speed: 4.8, edge: 1, reach: 1.2, curvature: 0 }
	),
	defineFamily(
		WEAPON_FAMILY.FIST,
		'FIST',
		'Fast strikes with moderate impact and low reach.',
		{ weight: 0.5, speed: 14.5, edge: 7, reach: 0.45, curvature: 8 }
	),
	defineFamily(
		WEAPON_FAMILY.KNIFE,
		'KNIFE',
		'Very fast strikes, low damage, improves precision with tier.',
		{ weight: 1.0, speed: 15.0, edge: 12, reach: 0.8, curvature: 15 }
	),
	defineFamily(
		WEAPON_FAMILY.LEGENDARY,
		'LEGENDARY',
		'Extreme weapons with high performance and consistency.',
		{ weight: 2.2, speed: 13.8, edge: 18, reach: 1.3, curvature: 18 }
	),
	defineFamily(
		WEAPON_FAMILY.MISC,
		'MISC',
		'Unpredictable weapons with mixed traits.',
		{ weight: 1.9, speed: 7.5, edge: 6, reach: 0.95, curvature: 3 }
	),
	defineFamily(
		WEAPON_FAMILY.POLEARM,
		'POLEARM',
		'Long reach weapons, slower but extended range.',
		{ weight: 3.1, speed: 6.3, edge: 10, reach: 1.85, curvature: 0 }
	),
	defineFamily(
		WEAPON_FAMILY.PROJECTILE,
		'PROJECTILE',
		'Amplifies external ammo and stays weak without loaded projectiles.',
		{ weight: 0.7, speed: 4.2, edge: 1, reach: 0.4, curvature: 0 }
	),
	defineFamily(
		WEAPON_FAMILY.RANGED,
		'RANGED',
		'Flexible long-range weapons such as whips or yoyos.',
		{ weight: 1.2, speed: 10.0, edge: 5, reach: 1.6, curvature: 12 }
	),
	defineFamily(
		WEAPON_FAMILY.SHIELD,
		'SHIELD',
		'Defensive tools using a blunt base with reduced damage output.',
		{ weight: 4.8, speed: 4.0, edge: 1, reach: 0.85, curvature: 2 }
	),
	defineFamily(
		WEAPON_FAMILY.STAFF,
		'STAFF',
		'Blunt weapons amplified by magic users.',
		{ weight: 2.4, speed: 6.8, edge: 4, reach: 1.7, curvature: 0 }
	),
	defineFamily(
		WEAPON_FAMILY.TOOL,
		'TOOL',
		'Utility items usable in combat but not optimized for it.',
		{ weight: 1.8, speed: 5.8, edge: 5, reach: 0.85, curvature: 2 }
	)
];

export const familyConfigs = Object.freeze(
	Object.fromEntries(familyEntries.map(entry => [entry.id, entry]))
);
export const weaponFamilyIds = Object.freeze(familyEntries.map(entry => entry.id));
export const weaponFamilyIdByKey = Object.freeze(
	Object.fromEntries(familyEntries.map(entry => [entry.key, entry.id]))
);
export const weaponFamilyKeyById = Object.freeze(
	Object.fromEntries(familyEntries.map(entry => [entry.id, entry.key]))
);

function formatAvailableFamilies() {
	return familyEntries.map(entry => `${entry.id}:${entry.key}`).join(', ');
}

function resolveFamilyId(value) {
	if (typeof value === 'number' && Number.isInteger(value) && weaponFamilyIds.includes(value)) {
		return value;
	}

	if (typeof value !== 'string') {
		return null;
	}

	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}

	const numericId = Number.parseInt(trimmed, 10);
	if (Number.isInteger(numericId) && `${numericId}` === trimmed && weaponFamilyIds.includes(numericId)) {
		return numericId;
	}

	return weaponFamilyIdByKey[trimmed.toUpperCase()] ?? null;
}

export function normalizeWeaponFamilyIds(values, label = 'families') {
	const familyIds = values.map(value => {
		const familyId = resolveFamilyId(value);
		if (familyId === null) {
			throw new Error(
				`${label} contains unknown id "${value}". Available families: ${formatAvailableFamilies()}`
			);
		}
		return familyId;
	});

	return [...new Set(familyIds)];
}

export function buildWeaponFamilyFlag(values) {
	return normalizeWeaponFamilyIds(values).reduce((flag, familyId) => flag | familyId, 0);
}

export function getWeaponFamilyIds(value) {
	if (typeof value === 'number') {
		return weaponFamilyIds.filter(familyId => (value & familyId) === familyId);
	}

	if (Array.isArray(value)) {
		return normalizeWeaponFamilyIds(value);
	}

	if (!value || typeof value !== 'object') {
		return [];
	}

	if (typeof value.familyFlag === 'number') {
		return getWeaponFamilyIds(value.familyFlag);
	}

	if (typeof value.familyMask === 'number') {
		return getWeaponFamilyIds(value.familyMask);
	}

	if (Array.isArray(value.families)) {
		return getWeaponFamilyIds(value.families);
	}

	if (Array.isArray(value.family)) {
		return getWeaponFamilyIds(value.family);
	}

	return [];
}

export function getWeaponFamilyKeys(value) {
	return getWeaponFamilyIds(value).map(familyId => weaponFamilyKeyById[familyId]);
}

export function hasAnyWeaponFamily(value, familyIds) {
	const flag =
		typeof value === 'number'
			? value
			: typeof value?.familyFlag === 'number'
				? value.familyFlag
				: typeof value?.familyMask === 'number'
					? value.familyMask
					: buildWeaponFamilyFlag(getWeaponFamilyIds(value));

	return familyIds.some(familyId => (flag & familyId) === familyId);
}
