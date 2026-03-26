import { add, divide, max } from 'mathjs';
import { DEFAULT_DAMAGE_WEIGHTS, EPSILON } from '../helpers/constants.js';
import { getWeaponFamilyIds } from '../items/weapons/familyConfigs.js';

function resolveWeaponFamilies(weapon, families) {
	const familyIds = getWeaponFamilyIds(weapon);
	const famList = familyIds.map(id => families[id]);

	if (!famList.length || famList.some(f => !f)) {
		throw new Error(
			`Invalid families for weapon "${weapon.displayName ?? weapon.name}": ${familyIds}`
		);
	}

	return { familyIds, famList };
}

// STEP 1 — Resolve base qualities from weapon families
export function resolveFamilyQualities(weapon, families) {
	const { famList } = resolveWeaponFamilies(weapon, families);

	// STEP 2 — Initialize accumulator
	let result = { weight: 0, speed: 0, edge: 0, reach: 0, curvature: 0 };

	// STEP 3 — Sum qualities
	for (const fam of famList) {
		const q = fam.qualities;
			result.weight = add(result.weight, q.weight);
			result.speed  = add(result.speed,  q.speed);
			result.edge   = add(result.edge,   q.edge);
			result.reach  = add(result.reach,  q.reach);
			result.curvature = add(result.curvature, q.curvature ?? 0);
	}

	// STEP 4 — Average values safely by using epsilon instead of 0 to prevent dividing by 0
	const count = max(famList.length, EPSILON);
	const qualityMultipliers = weapon.qualityMultipliers ?? weapon.qualityScale ?? {};
	const resolved = {
		weight: divide(result.weight, count),
		speed:  divide(result.speed,  count),
		edge:   divide(result.edge,   count),
		reach:  divide(result.reach,  count),
		curvature: divide(result.curvature, count)
	};

	return {
		weight: resolved.weight * (qualityMultipliers.weight ?? 1),
		speed: resolved.speed * (qualityMultipliers.speed ?? 1),
		edge: resolved.edge * (qualityMultipliers.edge ?? 1),
		reach: resolved.reach * (qualityMultipliers.reach ?? 1),
		curvature: resolved.curvature * (qualityMultipliers.curvature ?? 1)
	};
}

export function resolveFamilyDamageProfile(weapon, families) {
	const { famList } = resolveWeaponFamilies(weapon, families);

	let result = { weight: 0, speed: 0, edge: 0, reach: 0 };

	for (const fam of famList) {
		const profile = fam.damageProfile ?? DEFAULT_DAMAGE_WEIGHTS;
		result.weight = add(result.weight, profile.weight);
		result.speed  = add(result.speed,  profile.speed);
		result.edge   = add(result.edge,   profile.edge);
		result.reach  = add(result.reach,  profile.reach);
	}

	const count = max(famList.length, EPSILON);
	return {
		weight: divide(result.weight, count),
		speed:  divide(result.speed,  count),
		edge:   divide(result.edge,   count),
		reach:  divide(result.reach,  count)
	};
}
