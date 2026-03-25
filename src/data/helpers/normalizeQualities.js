import { divide, max as mathMax } from 'mathjs';
import { EPSILON } from './constants.js';

export function normalizeQualities(weaponQ, maxQ) {
	return {
		weight: divide(weaponQ.weight, mathMax(maxQ.weight, EPSILON)),
		speed:  divide(weaponQ.speed,  mathMax(maxQ.speed,  EPSILON)),
		edge:   divide(weaponQ.edge,   mathMax(maxQ.edge,   EPSILON)),
		reach:  divide(weaponQ.reach,  mathMax(maxQ.reach,  EPSILON))
	};
}