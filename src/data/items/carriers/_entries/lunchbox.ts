import { defineCarrier } from '../helpers/index.js';

export const lunchbox = defineCarrier({
	internalId: 5,
	id: 'lunchbox',
	display: {
			en: {
				name: 'Lunchbox',
				description: 'A compact insulated box that holds up to twelve edibles. Keeps food at a stable temperature. The food appreciates it, even if you don\'t.',
			},
		},
	rarity: 'common',
	allowedTypes: ['edible'],
	slots: 12,
	insulated: true,
	padded: true,
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'aura', id: 'spoilage_prevention', target: 'contents', magnitude: 1.0, duration: 0, chance: 1.0 },
		{ hook: 'aura', id: 'taste_preservation', target: 'contents', magnitude: 1.0, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
