import { Mass } from 'unitsnet-js';

import { WEAPON_FAMILY } from '../../../helpers/constants.js';
import { defineAmmo } from '../helpers/defineAmmo.js';

const { FIREARM } = WEAPON_FAMILY;

export const rocket = defineAmmo({
	id: 'rocket',
	internalId: 5,
	displayName: 'Rocket',
	description:
		'A self-propelled explosive round built for launchers that turn one shot into a very bad day.',
	tags: ['propelled', 'explosive', 'heavy'],
	qualities: { weight: Mass.FromGrams(2100).Grams },
	compatibleFamilyFlag: FIREARM,
	weaponAmplifiers: {
		bazooka: 1.28,
	},
	created_at: '2026-03-26T15:34:00.000Z',
});
