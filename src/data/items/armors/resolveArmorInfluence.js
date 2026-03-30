import { materialConfigs } from './materialConfigs.js';
import { typeConfigs }     from './typeConfigs.js';
import { getCritMitigation } from '../../helpers/armor/getCritMitigation.js';
import { getBaseDefense }    from '../../helpers/armor/getBaseDefense.js';
import { getBaseEvasion }    from '../../helpers/armor/getBaseEvasion.js';
import { getBaseStride }     from '../../helpers/armor/getBaseStride.js';

const SLOT_FORMULA = {
	helm:     (m, qm) => getCritMitigation(m.malleability, qm),
	chest:    (m, qm) => getBaseDefense(m.hardness, qm),
	leggings: (m, qm) => getBaseEvasion(m.malleability, m.weightFactor, qm),
	boots:    (m, qm) => getBaseStride(m.traction, qm),
};

function round(value) {
	return Math.round(value * 100) / 100;
}

// Returns normalized 0–1 values.
// base   — the central stat value for this armor piece
// spread — maximum deviation above/below base (driven by material variance)
// stat   — the stat name this armor piece contributes to
export function resolveArmorStat(armor) {
	const material = materialConfigs[armor.material];
	const qm       = armor.qualityMultipliers?.protection ?? 1;
	const base     = round(SLOT_FORMULA[armor.type](material, qm));
	const spread   = round(base * material.variance);

	return {
		stat:   typeConfigs[armor.type].stat,
		base,
		spread,
		min:    round(Math.max(base - spread, 0)),
		max:    round(base + spread),
	};
}

export function applyArmorInfluence(statValue, influenceValue) {
	return statValue * (1 + influenceValue);
}
