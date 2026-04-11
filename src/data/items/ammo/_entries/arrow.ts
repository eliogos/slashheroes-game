import { Mass } from 'unitsnet-js';

import { WEAPON_FAMILY } from '../../../helpers/constants.js';
import { defineAmmo } from '../helpers/defineAmmo.js';

const { PROJECTILE } = WEAPON_FAMILY;

export const arrow = defineAmmo({
	id: 'arrow',
	internalId: 2,
	display: {
			en: {
				name: 'Arrow',
				description: 'A fletched projectile tuned for bows, balancing low mass with clean puncturing flight.',
			},
		},
	qualities: { weight: Mass.FromGrams(45).Grams },
	compatibleFamilyFlag: PROJECTILE,
	weaponAmplifiers: {
		shortbow: 1,
		longbow: 1.12,
		recurve_bow: 1.19,
		composite_bow: 1.4,
	},
	created_at: '2026-03-26T14:55:00.000Z',
});
