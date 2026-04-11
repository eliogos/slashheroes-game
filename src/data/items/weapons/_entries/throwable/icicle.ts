import { defineWeapon, BLADE, THROWABLE } from '../../helpers/index.js';

export const icicle = defineWeapon({
	internalId: 140,
	id: 'icicle',
	display: {
			en: {
				name: 'Icicle',
				description: 'A jagged spike of winter hurled like a frozen dagger, leaving targets stiff and sluggish when the cold bites in.',
			},
		},
	tier: 2,
	grip: 0,
	families: BLADE | THROWABLE,
	qualityMultipliers: {
		weight: 0.54,
		speed: 1.18,
		edge: 1.12,
		reach: 0.78,
		curvature: 0.88,
	},
	effect: {
		type: 'status',
		id: 'cold',
		target: 'enemy',
		stat: 'movement',
		multiplier: 0.7,
		duration: 2,
		chance: 1,
	},
	created_at: '2026-04-09T00:00:00.000Z',
});
