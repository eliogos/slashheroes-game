import { defineWeapon, BLADE, LEGENDARY } from '../../helpers/index.js';

export const buster_sword = defineWeapon({
	internalId: 118,
	id: 'buster_sword',
	display: {
			en: {
				name: 'Buster Sword',
				description: 'A legendary blade so massive it barely qualifies as a sword. Swings slowly, lands absolutely, and leaves nothing to argue about.',
			},
		},
	tier: 6,
	grip: 2,
	families: BLADE | LEGENDARY,
	qualityMultipliers: {
		weight: 1.42,
		speed: 0.72,
		edge: 1.45,
		reach: 1.3,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
