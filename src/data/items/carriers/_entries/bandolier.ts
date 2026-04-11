import { defineCarrier } from '../helpers/index.js';

export const bandolier = defineCarrier({
	internalId: 6,
	id: 'bandolier',
	display: {
			en: {
				name: 'Bandolier',
				description: 'A cross-chest strap loaded with loops, pouches, and clips for every type of ammunition you carry. Organizes by type, stacks as each ammo allows, and keeps all of it within reach.',
			},
		},
	rarity: 'uncommon',
	quickAccess: true,
	allowedTypes: ['ammo'],
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'aura', id: 'durability_reinforcement', target: 'contents', magnitude: 1.25, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
