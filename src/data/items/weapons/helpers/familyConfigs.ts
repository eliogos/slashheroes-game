import { Angle, Length, Mass, Speed } from 'unitsnet-js';
import { EPSILON, WEAPON_FAMILY } from '../../../helpers/constants.js';
import type { WeaponDamageProfile, WeaponFamilyDefinition, WeaponQualitySet } from './types.js';

export type WeaponFamilyKey = keyof typeof WEAPON_FAMILY;

class WeaponFamily {
	id: number;
	key: WeaponFamilyKey;
	description: string;
	damageProfile: WeaponDamageProfile | null;
	_baseWeight: Mass;
	_speed: Speed;
	_edge: Length;
	_reach: Length;
	_curvature: Angle;

	constructor(id: number, key: WeaponFamilyKey) {
		this.id = id;
		this.key = key;
		this.description = '';
		this.damageProfile = null;

		this._baseWeight = Mass.FromKilograms(EPSILON);
		this._speed = Speed.FromMetersPerSecond(EPSILON);
		this._edge = Length.FromMillimeters(EPSILON);
		this._reach = Length.FromMeters(EPSILON);
		this._curvature = Angle.FromDegrees(0);
	}

	get qualities(): WeaponQualitySet {
		return {
			weight: this._baseWeight.Grams,
			speed: this._speed.MetersPerSecond,
			edge: this._edge.Millimeters,
			reach: this._reach.Centimeters,
			curvature: this._curvature.Radians,
		};
	}

	setDescription(value: string): this { this.description = value; return this; }
	setBaseWeight(value: Mass): this { this._baseWeight = value; return this; }
	setSpeed(value: Speed): this { this._speed = value; return this; }
	setEdge(value: Length): this { this._edge = value; return this; }
	setReach(value: Length): this { this._reach = value; return this; }
	setCurvature(value: Angle): this { this._curvature = value; return this; }
	setDamageProfile(value: WeaponDamageProfile): this { this.damageProfile = value; return this; }
}

const familyEntries = [
	new WeaponFamily(WEAPON_FAMILY.AXE, 'AXE')
		.setDescription('Heavy and slow, strong impact with moderate randomness.')
		.setBaseWeight(Mass.FromKilograms(3.4))
		.setSpeed(Speed.FromMetersPerSecond(5.4))
		.setEdge(Length.FromMillimeters(14))
		.setReach(Length.FromMeters(1.1))
		.setCurvature(Angle.FromDegrees(6)),

	new WeaponFamily(WEAPON_FAMILY.BATTERY, 'BATTERY')
		.setDescription('Powered weapons relying on energy and weaker without a charge source.')
		.setBaseWeight(Mass.FromKilograms(1.7))
		.setSpeed(Speed.FromMetersPerSecond(8.2))
		.setEdge(Length.FromMillimeters(8))
		.setReach(Length.FromMeters(1.0))
		.setCurvature(Angle.FromDegrees(4)),

	new WeaponFamily(WEAPON_FAMILY.BLADE, 'BLADE')
		.setDescription('Balanced weapons with consistent performance.')
		.setBaseWeight(Mass.FromKilograms(1.6))
		.setSpeed(Speed.FromMetersPerSecond(8.8))
		.setEdge(Length.FromMillimeters(12))
		.setReach(Length.FromMeters(1.0))
		.setCurvature(Angle.FromDegrees(10)),

	new WeaponFamily(WEAPON_FAMILY.BLUNT, 'BLUNT')
		.setDescription('Heavy impact weapons that swing slower and hit with raw force.')
		.setBaseWeight(Mass.FromKilograms(4.2))
		.setSpeed(Speed.FromMetersPerSecond(4.6))
		.setEdge(Length.FromMillimeters(2))
		.setReach(Length.FromMeters(1.05))
		.setCurvature(Angle.FromDegrees(0))
		.setDamageProfile({ weight: 0.95, speed: 0.01, edge: 0.03, reach: 0.2 }),

	new WeaponFamily(WEAPON_FAMILY.CURVED_BLADE, 'CURVED_BLADE')
		.setDescription('Most precise weapons, favoring controlled and consistent strikes.')
		.setBaseWeight(Mass.FromKilograms(1.5))
		.setSpeed(Speed.FromMetersPerSecond(9.4))
		.setEdge(Length.FromMillimeters(13))
		.setReach(Length.FromMeters(1.0))
		.setCurvature(Angle.FromDegrees(22)),

	new WeaponFamily(WEAPON_FAMILY.FIREARM, 'FIREARM')
		.setDescription('Amplifies ammo power and speed, but feels weak without ammunition.')
		.setBaseWeight(Mass.FromKilograms(2.8))
		.setSpeed(Speed.FromMetersPerSecond(4.8))
		.setEdge(Length.FromMillimeters(1))
		.setReach(Length.FromMeters(1.2))
		.setCurvature(Angle.FromDegrees(0)),

	new WeaponFamily(WEAPON_FAMILY.FIST, 'FIST')
		.setDescription('Fast strikes with moderate impact and low reach.')
		.setBaseWeight(Mass.FromKilograms(0.5))
		.setSpeed(Speed.FromMetersPerSecond(14.5))
		.setEdge(Length.FromMillimeters(7))
		.setReach(Length.FromMeters(0.45))
		.setCurvature(Angle.FromDegrees(8)),

	new WeaponFamily(WEAPON_FAMILY.KNIFE, 'KNIFE')
		.setDescription('Very fast strikes, low damage, improves precision with tier.')
		.setBaseWeight(Mass.FromKilograms(1.0))
		.setSpeed(Speed.FromMetersPerSecond(15.0))
		.setEdge(Length.FromMillimeters(12))
		.setReach(Length.FromMeters(0.8))
		.setCurvature(Angle.FromDegrees(15)),

	new WeaponFamily(WEAPON_FAMILY.LEGENDARY, 'LEGENDARY')
		.setDescription('Extreme weapons with high performance and consistency.')
		.setBaseWeight(Mass.FromKilograms(2.2))
		.setSpeed(Speed.FromMetersPerSecond(13.8))
		.setEdge(Length.FromMillimeters(18))
		.setReach(Length.FromMeters(1.3))
		.setCurvature(Angle.FromDegrees(18)),

	new WeaponFamily(WEAPON_FAMILY.MISC, 'MISC')
		.setDescription('Unpredictable weapons with mixed traits.')
		.setBaseWeight(Mass.FromKilograms(1.9))
		.setSpeed(Speed.FromMetersPerSecond(7.5))
		.setEdge(Length.FromMillimeters(6))
		.setReach(Length.FromMeters(0.95))
		.setCurvature(Angle.FromDegrees(3)),

	new WeaponFamily(WEAPON_FAMILY.POLEARM, 'POLEARM')
		.setDescription('Long reach weapons, slower but extended range.')
		.setBaseWeight(Mass.FromKilograms(3.1))
		.setSpeed(Speed.FromMetersPerSecond(6.3))
		.setEdge(Length.FromMillimeters(10))
		.setReach(Length.FromMeters(1.85))
		.setCurvature(Angle.FromDegrees(0)),

	new WeaponFamily(WEAPON_FAMILY.PROJECTILE, 'PROJECTILE')
		.setDescription('Amplifies external ammo and stays weak without loaded projectiles.')
		.setBaseWeight(Mass.FromKilograms(0.7))
		.setSpeed(Speed.FromMetersPerSecond(4.2))
		.setEdge(Length.FromMillimeters(1))
		.setReach(Length.FromMeters(0.4))
		.setCurvature(Angle.FromDegrees(0)),

	new WeaponFamily(WEAPON_FAMILY.RANGED, 'RANGED')
		.setDescription('Flexible long-range weapons such as whips or yoyos.')
		.setBaseWeight(Mass.FromKilograms(1.2))
		.setSpeed(Speed.FromMetersPerSecond(10.0))
		.setEdge(Length.FromMillimeters(5))
		.setReach(Length.FromMeters(1.6))
		.setCurvature(Angle.FromDegrees(12)),

	new WeaponFamily(WEAPON_FAMILY.SHIELD, 'SHIELD')
		.setDescription('Defensive tools using a blunt base with reduced damage output.')
		.setBaseWeight(Mass.FromKilograms(4.8))
		.setSpeed(Speed.FromMetersPerSecond(4.0))
		.setEdge(Length.FromMillimeters(1))
		.setReach(Length.FromMeters(0.85))
		.setCurvature(Angle.FromDegrees(2)),

	new WeaponFamily(WEAPON_FAMILY.STAFF, 'STAFF')
		.setDescription('Blunt weapons amplified by magic users.')
		.setBaseWeight(Mass.FromKilograms(2.4))
		.setSpeed(Speed.FromMetersPerSecond(6.8))
		.setEdge(Length.FromMillimeters(4))
		.setReach(Length.FromMeters(1.7))
		.setCurvature(Angle.FromDegrees(0)),

	new WeaponFamily(WEAPON_FAMILY.TOOL, 'TOOL')
		.setDescription('Utility items usable in combat but not optimized for it.')
		.setBaseWeight(Mass.FromKilograms(1.8))
		.setSpeed(Speed.FromMetersPerSecond(5.8))
		.setEdge(Length.FromMillimeters(5))
		.setReach(Length.FromMeters(0.85))
		.setCurvature(Angle.FromDegrees(2)),

	new WeaponFamily(WEAPON_FAMILY.THROWABLE, 'THROWABLE')
		.setDescription('Thrown support weapons used for pre-attacks and counterattack follow-ups.')
		.setBaseWeight(Mass.FromKilograms(EPSILON))
		.setSpeed(Speed.FromMetersPerSecond(EPSILON))
		.setEdge(Length.FromMillimeters(EPSILON))
		.setReach(Length.FromMeters(EPSILON))
		.setCurvature(Angle.FromDegrees(0)),
];

export const familyConfigs = Object.freeze(
	Object.fromEntries(familyEntries.map((entry) => [entry.id, entry])) as Record<number, WeaponFamilyDefinition>,
);
export const weaponFamilyIds = Object.freeze(familyEntries.map((entry) => entry.id));
export const weaponFamilyIdByKey = Object.freeze(
	Object.fromEntries(familyEntries.map((entry) => [entry.key, entry.id])) as Record<WeaponFamilyKey, number>,
);
export const weaponFamilyKeyById = Object.freeze(
	Object.fromEntries(familyEntries.map((entry) => [entry.id, entry.key])) as Record<number, WeaponFamilyKey>,
);
const allWeaponFamilyFlags = weaponFamilyIds.reduce((flag, familyId) => flag | familyId, 0);

function formatAvailableFamilies(): string {
	return familyEntries.map((entry) => `${entry.id}:${entry.key}`).join(', ');
}

function isValidWeaponFamilyFlag(value: number): boolean {
	return Number.isInteger(value) && value > 0 && (value & ~allWeaponFamilyFlags) === 0;
}

function toFamilyValueList(values: unknown): unknown[] {
	if (values === undefined || values === null) {
		return [];
	}

	return Array.isArray(values) ? values : [values];
}

function resolveFamilyId(value: unknown): number | null {
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

	return weaponFamilyIdByKey[trimmed.toUpperCase() as WeaponFamilyKey] ?? null;
}

export function normalizeWeaponFamilyIds(values: unknown, label = 'families'): number[] {
	if (typeof values === 'number') {
		if (!isValidWeaponFamilyFlag(values)) {
			throw new Error(
				`${label} contains unknown flag "${values}". Available families: ${formatAvailableFamilies()}`,
			);
		}

		return getWeaponFamilyIds(values);
	}

	const familyIds = toFamilyValueList(values).map((value) => {
		const familyId = resolveFamilyId(value);
		if (familyId === null) {
			throw new Error(
				`${label} contains unknown id "${value}". Available families: ${formatAvailableFamilies()}`,
			);
		}
		return familyId;
	});

	return [...new Set(familyIds)];
}

export function buildWeaponFamilyFlag(values: unknown): number {
	if (typeof values === 'number') {
		if (!isValidWeaponFamilyFlag(values)) {
			throw new Error(
				`families contains unknown flag "${values}". Available families: ${formatAvailableFamilies()}`,
			);
		}

		return values;
	}

	return normalizeWeaponFamilyIds(values).reduce((flag, familyId) => flag | familyId, 0);
}

export function getWeaponFamilyIds(value: unknown): number[] {
	if (typeof value === 'number') {
		return weaponFamilyIds.filter((familyId) => (value & familyId) === familyId);
	}

	if (typeof value === 'string') {
		return normalizeWeaponFamilyIds(value);
	}

	if (Array.isArray(value)) {
		return normalizeWeaponFamilyIds(value);
	}

	if (!value || typeof value !== 'object') {
		return [];
	}

	const input = value as {
		familyFlag?: number;
		familyMask?: number;
		families?: unknown;
		family?: unknown;
	};

	if (typeof input.familyFlag === 'number') {
		return getWeaponFamilyIds(input.familyFlag);
	}

	if (typeof input.familyMask === 'number') {
		return getWeaponFamilyIds(input.familyMask);
	}

	if (input.families !== undefined) {
		return getWeaponFamilyIds(input.families);
	}

	if (input.family !== undefined) {
		return getWeaponFamilyIds(input.family);
	}

	return [];
}

export function getWeaponFamilyKeys(value: unknown): WeaponFamilyKey[] {
	return getWeaponFamilyIds(value).map((familyId) => weaponFamilyKeyById[familyId]);
}

export function hasAnyWeaponFamily(value: unknown, familyIds: number[]): boolean {
	const input = value as { familyFlag?: number; familyMask?: number } | undefined;
	const flag =
		typeof value === 'number'
			? value
			: typeof input?.familyFlag === 'number'
				? input.familyFlag
				: typeof input?.familyMask === 'number'
					? input.familyMask
					: buildWeaponFamilyFlag(getWeaponFamilyIds(value));

	return familyIds.some((familyId) => (flag & familyId) === familyId);
}

export function getPrimaryFamilyKey(value: unknown): WeaponFamilyKey | null {
	const ids = getWeaponFamilyIds(value);
	if (!ids.length) {
		return null;
	}

	if (ids.includes(WEAPON_FAMILY.THROWABLE)) {
		return 'THROWABLE';
	}

	return weaponFamilyKeyById[Math.min(...ids)] ?? null;
}
