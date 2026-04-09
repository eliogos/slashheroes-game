import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const bludgeon = defineWeapon({
	internalId: 36,
	id: 'bludgeon',
	displayName: 'Bludgeon',
	description: 'A brutally heavy melee weapon that overwhelms through repeated crushing hits.',
	tags: [
	'brutal',
	'crushing',
	'oppressive',
],
	tier: 3,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 1.12,
		speed: 0.92,
		reach: 0.95,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
