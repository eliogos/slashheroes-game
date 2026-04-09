import { defineCarrier } from '../helpers/index.js';

export const ringOfRings = defineCarrier({
	internalId: 2,
	id: 'ring_of_rings',
	displayName: 'Ring of Rings',
	description: 'A single enchanted band that absorbs up to five other rings, blending their magic into one averaged effect. Efficient. Slightly unsettling to think about too hard.',
	tags: ['ring', 'magical', 'carrier'],
	rarity: 'unique',
	allowedTypes: ['ring'],
	slots: 5,
	effectMode: 'average',
	equipSlot: 'ring',
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'onEquip', id: 'ring_effect_average', target: 'self', magnitude: 1.0, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
