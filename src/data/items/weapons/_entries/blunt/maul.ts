import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const maul = defineWeapon({
	internalId: 42,
	id: 'maul',
	displayName: 'Maul',
	description: 'A huge two-handed hammer built to flatten anything standing in front of it.',
	tags: [
	'gigantic',
	'flattening',
	'relentless',
],
	tier: 4,
	grip: 2,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.25,
		speed: 0.8,
		reach: 1.04,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
