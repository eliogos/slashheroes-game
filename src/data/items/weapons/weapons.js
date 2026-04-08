import { axeWeapons } from './families/axe.js';
import { batteryWeapons } from './families/battery.js';
import { bladeWeapons } from './families/blade.js';
import { bluntWeapons } from './families/blunt.js';
import { curved_bladeWeapons } from './families/curved_blade.js';
import { firearmWeapons } from './families/firearm.js';
import { fistWeapons } from './families/fist.js';
import { knifeWeapons } from './families/knife.js';
import { legendaryWeapons } from './families/legendary.js';
import { miscWeapons } from './families/misc.js';
import { polearmWeapons } from './families/polearm.js';
import { projectileWeapons } from './families/projectile.js';
import { rangedWeapons } from './families/ranged.js';
import { shieldWeapons } from './families/shield.js';
import { staffWeapons } from './families/staff.js';
import { throwableWeapons } from './families/throwable.js';

export const weapons = [
	...axeWeapons,
	...batteryWeapons,
	...bladeWeapons,
	...bluntWeapons,
	...curved_bladeWeapons,
	...firearmWeapons,
	...fistWeapons,
	...knifeWeapons,
	...legendaryWeapons,
	...miscWeapons,
	...polearmWeapons,
	...projectileWeapons,
	...rangedWeapons,
	...shieldWeapons,
	...staffWeapons,
	...throwableWeapons
];

export const activeWeapons = weapons.filter(weapon => !weapon.archived);
