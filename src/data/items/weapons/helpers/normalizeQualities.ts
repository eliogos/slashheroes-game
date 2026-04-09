import { divide, max as mathMax } from 'mathjs';
import { EPSILON } from '../../../helpers/constants.js';
import type { WeaponQualitySet } from './types.js';

export type NormalizedWeaponQualities = Pick<WeaponQualitySet, 'weight' | 'speed' | 'edge' | 'reach'>;

export function normalizeQualities(
	weaponQ: Pick<WeaponQualitySet, 'weight' | 'speed' | 'edge' | 'reach'>,
	maxQ: Pick<WeaponQualitySet, 'weight' | 'speed' | 'edge' | 'reach'>,
): NormalizedWeaponQualities {
	return {
		weight: divide(weaponQ.weight, mathMax(maxQ.weight, EPSILON)) as number,
		speed: divide(weaponQ.speed, mathMax(maxQ.speed, EPSILON)) as number,
		edge: divide(weaponQ.edge, mathMax(maxQ.edge, EPSILON)) as number,
		reach: divide(weaponQ.reach, mathMax(maxQ.reach, EPSILON)) as number,
	};
}
