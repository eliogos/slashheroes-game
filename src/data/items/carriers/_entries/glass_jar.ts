import { defineCarrier } from '../helpers/index.js';

export const glassJar = defineCarrier({
	internalId: 12,
	id: 'glass_jar',
	displayName: 'Glass Jar',
	description: 'A sealed glass jar with air holes punched in the lid. Catch fireflies and keep them alive inside — they glow just enough to light a room when the dark gets too dark.',
	tags: ['firefly', 'light', 'utility'],
	rarity: 'common',
	allowedTags: ['firefly'],
	slots: 5,
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'aura', id: 'light_emission', target: 'area', magnitude: 1.0, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
