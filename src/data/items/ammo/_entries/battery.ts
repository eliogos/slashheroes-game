import { Mass } from 'unitsnet-js';

import { WEAPON_FAMILY } from '../../../helpers/constants.js';
import { defineAmmo } from '../helpers/defineAmmo.js';

const { BATTERY } = WEAPON_FAMILY;

export const battery = defineAmmo({
	id: 'battery',
	internalId: 3,
	displayName: 'Battery',
	description:
		'A generic charge cell that feeds powered weapons and scales with how efficiently they convert stored energy.',
	tags: ['charged', 'stored', 'volatile'],
	qualities: { weight: Mass.FromGrams(120).Grams },
	compatibleFamilyFlag: BATTERY,
	weaponAmplifiers: {
		taser: 0.95,
		electric_baton: 1.05,
		electric_whip: 1.08,
		electric_guitar: 1.1,
		electric_racket: 1,
		lightsabre: 1.5,
	},
	created_at: '2026-03-26T14:55:00.000Z',
});
