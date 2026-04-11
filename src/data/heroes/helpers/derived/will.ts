import type { HeroWillpowerProfile } from '../../types.js';
import { BASELINE_CORE_STAT, normalizeStat } from './_utils.js';

export function getWillpower(luck: number, baseline = BASELINE_CORE_STAT): HeroWillpowerProfile {
	const safeLuck = normalizeStat(luck, baseline);
	const bonus = Math.floor((safeLuck - baseline) / 2);

	return { bonus };
}
