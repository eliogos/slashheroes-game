import { weapons } from '../weapons.js';
import KNIVES from '../config/knives.js';
import { resolveFamilyQualities } from '../../../helpers/resolveFamilyQualities.js';
import { applyTierScaling } from '../../../helpers/tierScaling.js';
import { normalizeQualities } from '../../../helpers/normalizeQualities.js';
import { getBaseDamage } from '../../../helpers/getBaseDamage.js';
import { getDamageRange } from '../../../helpers/damageVariance.js';

// STEP 0 — Map family ID to config
const families = { KNIVES };

// STEP 0.5 — Compute max qualities for normalization
function getMaxQualities(weaponList) {
	let max = { weight: 0, speed: 0, edge: 0, reach: 0 };
	for (const w of weaponList) {
		const baseQ = resolveFamilyQualities(w, families);
		const scaledQ = applyTierScaling(baseQ, w.tier);
		max.weight = Math.max(max.weight, scaledQ.weight);
		max.speed  = Math.max(max.speed, scaledQ.speed);
		max.edge   = Math.max(max.edge, scaledQ.edge);
		max.reach  = Math.max(max.reach, scaledQ.reach);
	}
	return max;
}

const maxQualities = getMaxQualities(weapons);

// STEP 1 — Loop through all weapons
for (const weapon of weapons) {
	// STEP 2 — Resolve family qualities
	const baseQ = resolveFamilyQualities(weapon, families);

	// STEP 3 — Apply tier scaling
	const scaledQ = applyTierScaling(baseQ, weapon.tier);

	// STEP 4 — Normalize qualities relative to all weapons
	const normQ = normalizeQualities(scaledQ, maxQualities);

	// STEP 5 — Compute base damage
	const baseDamage = getBaseDamage(normQ);

	// STEP 6 — Apply curvature-based variance
	const range = getDamageRange(baseDamage, scaledQ.curvature);

	// STEP 7 — Output result
	console.log(`${weapon.name} (Tier ${weapon.tier}):`, {
		baseDamage,
		minDamage: range.min,
		maxDamage: range.max,
		scaledQualities: scaledQ
	});
}