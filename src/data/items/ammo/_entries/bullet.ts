import { Mass } from 'unitsnet-js';

import { WEAPON_FAMILY } from '../../../helpers/constants.js';
import { defineAmmo } from '../helpers/defineAmmo.js';

const { FIREARM } = WEAPON_FAMILY;

export const bullet = defineAmmo({
	id: 'bullet',
	internalId: 4,
	displayName: 'Bullet',
	description:
		'A generalized firearm round meant to cover most guns before you split calibers into their own entries.',
	tags: ['metal', 'compact', 'ballistic'],
	qualities: { weight: Mass.FromGrams(12).Grams },
	compatibleFamilyFlag: FIREARM,
	weaponAmplifiers: {
		flintlock: 0.95,
		musket: 1.04,
		rifle: 1.12,
		machine_gun: 1.28,
	},
	created_at: '2026-03-26T14:55:00.000Z',
});
