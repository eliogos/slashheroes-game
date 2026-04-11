import { defineCarrier } from '../helpers/index.js';

export const honeypot = defineCarrier({
	internalId: 11,
	id: 'honeypot',
	display: {
			en: {
				name: 'Honeypot',
				description: 'A small sealed crock for carrying honey. Scooping a spoonful restores a bit of stamina. Attracts bears. Use with awareness.',
			},
		},
	rarity: 'common',
	quickAccess: true,
	allowedTags: ['honey'],
	slots: 10,
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'onUse', id: 'stamina_restore', target: 'self', magnitude: 20, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
