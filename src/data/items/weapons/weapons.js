import weaponsData from './weapons.json' with { type: 'json' };

export const weapons = weaponsData;
export const activeWeapons = weapons.filter(weapon => !weapon.archived);
