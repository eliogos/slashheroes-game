import { add, divide, max } from 'mathjs';
import { DEFAULT_DAMAGE_WEIGHTS, EPSILON, WEAPON_FAMILY } from '../../../helpers/constants.js';
import { getWeaponFamilyIds } from './familyConfigs.js';
import type { WeaponDamageProfile, WeaponDefinition, WeaponFamilyDefinition, WeaponQualitySet } from './types.js';

export const THROWABLE_BASE_QUALITY_BONUS = Object.freeze({
	reach: 40,
	curvature: Math.PI / 18,
});

function hasThrowableFamily(weapon: WeaponDefinition): boolean {
	return getWeaponFamilyIds(weapon).includes(WEAPON_FAMILY.THROWABLE);
}

function getContributingFamilies(famList: WeaponFamilyDefinition[]): WeaponFamilyDefinition[] {
	const filtered = famList.filter((family) => family.id !== WEAPON_FAMILY.THROWABLE);
	return filtered.length ? filtered : famList;
}

function resolveWeaponFamilies(
	weapon: WeaponDefinition,
	families: Record<number, WeaponFamilyDefinition>,
): { familyIds: number[]; famList: WeaponFamilyDefinition[] } {
	const familyIds = getWeaponFamilyIds(weapon);
	const famList = familyIds.map((id) => families[id]);

	if (!famList.length || famList.some((family) => !family)) {
		throw new Error(
			`Invalid families for weapon "${weapon.display.en.name ?? weapon.id}": ${familyIds}`,
		);
	}

	return { familyIds, famList };
}

export function resolveFamilyQualities(
	weapon: WeaponDefinition,
	families: Record<number, WeaponFamilyDefinition>,
): WeaponQualitySet {
	const { famList } = resolveWeaponFamilies(weapon, families);
	const contributingFamilies = getContributingFamilies(famList);

	let result: WeaponQualitySet = { weight: 0, speed: 0, edge: 0, reach: 0, curvature: 0 };

	for (const family of contributingFamilies) {
		const q = family.qualities;
		result.weight = add(result.weight, q.weight) as number;
		result.speed = add(result.speed, q.speed) as number;
		result.edge = add(result.edge, q.edge) as number;
		result.reach = add(result.reach, q.reach) as number;
		result.curvature = add(result.curvature, q.curvature ?? 0) as number;
	}

	const count = max(contributingFamilies.length, EPSILON) as number;
	const qualityMultipliers = weapon.qualityMultipliers ?? {};
	const resolved: WeaponQualitySet = {
		weight: divide(result.weight, count) as number,
		speed: divide(result.speed, count) as number,
		edge: divide(result.edge, count) as number,
		reach: divide(result.reach, count) as number,
		curvature: divide(result.curvature, count) as number,
	};

	const finalQualities: WeaponQualitySet = {
		weight: resolved.weight * (qualityMultipliers.weight ?? 1),
		speed: resolved.speed * (qualityMultipliers.speed ?? 1),
		edge: resolved.edge * (qualityMultipliers.edge ?? 1),
		reach: resolved.reach * (qualityMultipliers.reach ?? 1),
		curvature: resolved.curvature * (qualityMultipliers.curvature ?? 1),
	};

	if (!hasThrowableFamily(weapon)) {
		return finalQualities;
	}

	return {
		...finalQualities,
		reach: finalQualities.reach + THROWABLE_BASE_QUALITY_BONUS.reach,
		curvature: finalQualities.curvature + THROWABLE_BASE_QUALITY_BONUS.curvature,
	};
}

export function resolveFamilyDamageProfile(
	weapon: WeaponDefinition,
	families: Record<number, WeaponFamilyDefinition>,
): Required<WeaponDamageProfile> {
	const { famList } = resolveWeaponFamilies(weapon, families);
	const contributingFamilies = getContributingFamilies(famList);

	let result = { weight: 0, speed: 0, edge: 0, reach: 0 };

	for (const family of contributingFamilies) {
		const profile = family.damageProfile ?? DEFAULT_DAMAGE_WEIGHTS;
		result.weight = add(result.weight, profile.weight ?? DEFAULT_DAMAGE_WEIGHTS.weight) as number;
		result.speed = add(result.speed, profile.speed ?? DEFAULT_DAMAGE_WEIGHTS.speed) as number;
		result.edge = add(result.edge, profile.edge ?? DEFAULT_DAMAGE_WEIGHTS.edge) as number;
		result.reach = add(result.reach, profile.reach ?? DEFAULT_DAMAGE_WEIGHTS.reach) as number;
	}

	const count = max(contributingFamilies.length, EPSILON) as number;
	return {
		weight: divide(result.weight, count) as number,
		speed: divide(result.speed, count) as number,
		edge: divide(result.edge, count) as number,
		reach: divide(result.reach, count) as number,
	};
}
