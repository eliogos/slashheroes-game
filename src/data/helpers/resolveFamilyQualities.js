import { add, divide, max } from 'mathjs';
import { EPSILON } from '../helpers/constants.js';

// STEP 1 — Resolve base qualities from weapon families
export function resolveFamilyQualities(weapon, families) {
	const famList = weapon.family.map(id => families[id]);

	// STEP 2 — Guard: ensure valid families exist
	if (!famList.length || famList.some(f => !f)) {
		throw new Error(
			`Invalid families for weapon "${weapon.name}": ${weapon.family}`
		);
	}

	// STEP 3 — Initialize accumulator
	let result = { weight: 0, speed: 0, edge: 0, reach: 0, curvature: 0 };

	// STEP 4 — Sum qualities
	for (const fam of famList) {
		const q = fam.qualities;
			result.weight = add(result.weight, q.weight);
			result.speed  = add(result.speed,  q.speed);
			result.edge   = add(result.edge,   q.edge);
			result.reach  = add(result.reach,  q.reach);
			result.curvature = add(result.curvature, q.curvature ?? 0);
	}

	// STEP 5 — Average values safely by using epsilon instead of 0 to prevent dividing by 0
	const count = max(famList.length, EPSILON);
	return {
		weight: divide(result.weight, count),
		speed:  divide(result.speed,  count),
		edge:   divide(result.edge,   count),
		reach:  divide(result.reach,  count),
		curvature: divide(result.curvature, count)
	};
}