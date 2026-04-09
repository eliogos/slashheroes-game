import { defineWeapon, BLUNT, FIST } from '../../helpers/index.js';

export const gauntlet = defineWeapon({
	internalId: 76,
	id: 'gauntlet',
	displayName: 'Stone Gauntlet',
	description: 'A gauntlet carved from dense stone that turns every punch into a wall hitting you back.',
	tags: [
	'stone',
	'crushing',
	'supreme',
],
	tier: 6,
	grip: 1,
	families: BLUNT | FIST,
	qualityMultipliers: {
		weight: 1.38,
		speed: 0.88,
		edge: 1.18,
		reach: 0.94,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
