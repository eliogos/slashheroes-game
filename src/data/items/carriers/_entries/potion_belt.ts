import { defineCarrier } from '../helpers/index.js';

export const potionBelt = defineCarrier({
	internalId: 1,
	id: 'potion_belt',
	display: {
			en: {
				name: 'Potion Belt',
				description: 'A wide leather belt lined with snug loops, one per potion. Keeps them upright, reachable, and mercifully unbroken. Smalls can be merged into mediums, mediums into greats — a full belt holds twenty, but a smart one holds fewer.',
			},
		},
	rarity: 'uncommon',
	quickAccess: true,
	allowedTags: ['potion'],
	slots: 20,
	mergeable: true,
	mergeTiers: ['small', 'medium', 'great'],
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'aura', id: 'elemental_protection', target: 'contents', magnitude: 1.0, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
