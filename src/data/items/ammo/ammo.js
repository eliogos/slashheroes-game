import { batteryAmmo } from './families/battery.js';
import { firearmAmmo } from './families/firearm.js';
import { projectileAmmo } from './families/projectile.js';

export const ammo = [
	...projectileAmmo,
	...batteryAmmo,
	...firearmAmmo,
];

export const activeAmmo = ammo.filter(entry => !entry.archived);

export function getAmmoById(id) {
	return activeAmmo.find(entry => entry.id === id) ?? null;
}
