import { Mass } from 'unitsnet-js';

import { WEAPON_FAMILY } from '../../../helpers/constants.js';
import { defineAmmo } from '../helpers/defineAmmo.js';

const { FIREARM, PROJECTILE } = WEAPON_FAMILY;

export const pellet = defineAmmo({
	id: 'pellet',
	internalId: 1,
	displayName: 'Pellet',
	description:
		'A generic impact round shared by slings, slingshots, and crude cannons, with each weapon amplifying the shot differently.',
	tags: ['generic', 'compact', 'impact'],
	qualities: { weight: Mass.FromGrams(180).Grams },
	compatibleFamilyFlag: PROJECTILE | FIREARM,
	weaponAmplifiers: {
		sling: 1,
		slingshot: 0.92,
		handcannon: 1.55,
	},
	created_at: '2026-03-26T14:55:00.000Z',
});
