import { bootsArmors } from './_entries/boots.js';
import { chestArmors } from './_entries/chest.js';
import { helmArmors } from './_entries/helm.js';
import { leggingsArmors } from './_entries/leggings.js';
import { materialConfigs, materialIds } from './materialConfigs.js';
import { ARMOR_TYPE, armorTypeIds, typeConfigs } from './__types/index.js';
import { defineArmor, resolveArmorStat } from './helpers/index.js';
import type { ActiveArmorDefinition, ArmorDefinition } from './types.js';

export { ARMOR_TYPE, armorTypeIds, typeConfigs, materialConfigs, materialIds, defineArmor, resolveArmorStat };
export * from './helpers/index.js';
export * from './types.js';

export const helms = [...helmArmors];
export const chests = [...chestArmors];
export const leggings = [...leggingsArmors];
export const boots = [...bootsArmors];

export const armors: ArmorDefinition[] = [...helms, ...chests, ...leggings, ...boots];
export const activeArmors: ActiveArmorDefinition[] = armors.filter((armor) => !armor.archived) as ActiveArmorDefinition[];

export function getArmorById(armorId: string): ArmorDefinition | undefined {
	return armors.find((armor) => armor.id === armorId);
}

export function getActiveArmorById(armorId: string): ActiveArmorDefinition | undefined {
	return activeArmors.find((armor) => armor.id === armorId);
}
