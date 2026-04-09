import { defineCarrier } from '../helpers/index.js';

export const waterskin = defineCarrier({
	internalId: 7,
	id: 'waterskin',
	displayName: 'Waterskin',
	description: 'A soft leather pouch for carrying liquid drops. Droplets absorbed on pickup go here instead of being lost — drinking from the skin restores a bit of health with each sip.',
	tags: ['droplet', 'liquid', 'utility'],
	rarity: 'common',
	quickAccess: true,
	allowedTypes: ['droplet'],
	slots: 15,
	acquiredFrom: ['shop', 'merchant'],
	effects: [
		{ hook: 'onUse', id: 'heal', target: 'self', magnitude: 15, duration: 0, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
