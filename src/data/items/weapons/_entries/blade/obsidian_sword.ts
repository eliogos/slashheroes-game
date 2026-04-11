import { defineWeapon, BLADE, BLUNT } from '../../helpers/index.js';

export const obsidian_sword = defineWeapon({
	internalId: 16,
	id: 'obsidian_sword',
	display: {
			en: {
				name: 'Macuahuitl',
				description: 'A brutal war club lined with cutting edges, blending crushing force with savage slashes.',
			},
		},
	tier: 5,
	grip: 2,
	families: BLADE | BLUNT,
	qualityMultipliers: {
		weight: 1.12,
		speed: 0.86,
		edge: 0.96,
		reach: 0.97,
		curvature: 0.75,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
