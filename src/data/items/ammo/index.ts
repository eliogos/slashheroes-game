import { arrow } from './_entries/arrow.js';
import { battery } from './_entries/battery.js';
import { bullet } from './_entries/bullet.js';
import { pellet } from './_entries/pellet.js';
import { rocket } from './_entries/rocket.js';
import type { ActiveAmmoDefinition } from './types.js';

export type {
	ActiveAmmoDefinition,
	AmmoDefinition,
	AmmoLocalization,
	AmmoLocalizationEntry,
	AmmoQualities,
	AmmoWeaponAmplifiers,
} from './types.js';
export { DEFAULT_AMMO_QUALITIES, defineAmmo } from './helpers/index.js';
export { arrow, battery, bullet, pellet, rocket };

export const ammo = [pellet, arrow, battery, bullet, rocket];
export const activeAmmo = ammo.filter(
	(entry): entry is ActiveAmmoDefinition => !entry.archived,
);

export function getAmmoById(id: string): ActiveAmmoDefinition | null {
	return activeAmmo.find((entry) => entry.id === id) ?? null;
}
