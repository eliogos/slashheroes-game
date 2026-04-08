import { helmArmors } from './types/helm.js';
import { chestArmors } from './types/chest.js';
import { leggingsArmors } from './types/leggings.js';
import { bootsArmors } from './types/boots.js';

export const helms    = helmArmors;
export const chests   = chestArmors;
export const leggings = leggingsArmors;
export const boots    = bootsArmors;

export const armors       = [...helms, ...chests, ...leggings, ...boots];
export const activeArmors = armors.filter(entry => !entry.archived);

export function getArmorById(id) {
	return activeArmors.find(entry => entry.id === id) ?? null;
}

export function getArmorsByType(type) {
	return activeArmors.filter(entry => entry.type === type);
}

export function getArmorsByMaterial(material) {
	return activeArmors.filter(entry => entry.material === material);
}
