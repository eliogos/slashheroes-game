import type { ComputedHeroStats, DerivedHeroStats } from '../types.js';
import { getFocus } from './derived/focus.js';
import { getBaseATKSpeed } from './derived/atkspd.js';
import { getBaseEvasion } from './derived/eva.js';
import { getAccuracy } from './derived/acc.js';
import { getCritChance } from './derived/crit.js';
import { getWillpower } from './derived/will.js';
import { getPhysicalDmg } from './derived/pdamage.js';
import { getWeightCap } from './derived/wcap.js';
import { getStaminaRegenPerSecond, getStaminaRegenIdleDelay } from './derived/stareg.js';
import { getManaRegenPerAction } from './derived/mpreg.js';
import { getPoise } from './derived/poise.js';
import { getMagicEffectEndurance } from './derived/mend.js';
import { getRFLX } from './derived/rflx.js';
// Barrel for all derived stat helpers
export * from './derived/focus.js';
export * from './derived/atkspd.js';
export * from './derived/eva.js';
export * from './derived/acc.js';
export * from './derived/crit.js';
export * from './derived/will.js';
export * from './derived/pdamage.js';
export * from './derived/wcap.js';
export * from './derived/stareg.js';
export * from './derived/mpreg.js';
export * from './derived/poise.js';
export * from './derived/mend.js';
export * from './derived/rflx.js';

export function getDerivedHeroStats(stats: ComputedHeroStats): DerivedHeroStats {
	return {
		focus: getFocus(stats.WIS, stats.INT),
		attackSpeed: getBaseATKSpeed(stats.AGI),
		evasion: getBaseEvasion(stats.AGI),
		accuracy: getAccuracy(stats.PER),
		critChance: getCritChance(stats.PER, stats.LUK),
		willpower: getWillpower(stats.LUK),
		physicalDamage: getPhysicalDmg(stats.STR),
		weightCap: getWeightCap(stats.STR),
		staminaRegen: {
			perSecond: getStaminaRegenPerSecond(stats.STA, stats.AGI),
			idleDelaySeconds: getStaminaRegenIdleDelay(stats.STA, stats.AGI),
		},
		manaRegen: {
			perAction: getManaRegenPerAction(stats.WIS, stats.INT, stats.MP),
		},
		poise: getPoise(stats.STR, stats.STA),
		magicEffectEndurance: getMagicEffectEndurance(stats.MP, stats.WIS),
		reflex: getRFLX(stats.INT, stats.PER, stats.HUN, stats.AGI),
	};
}
