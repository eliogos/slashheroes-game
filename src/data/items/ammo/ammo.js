import ammoData from './ammo.json' with { type: 'json' };

export const ammo = ammoData;
export const activeAmmo = ammo.filter(entry => !entry.archived);

export function getAmmoById(id) {
	return activeAmmo.find(entry => entry.id === id) ?? null;
}
