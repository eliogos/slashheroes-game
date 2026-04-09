import { defineCarrier } from '../helpers/index.js';

export const firstAidKit = defineCarrier({
	internalId: 10,
	id: 'first_aid_kit',
	displayName: 'First Aid Kit',
	description: 'A compact kit holding healing potions and bandaids. Everything you need when things go wrong, right where you can grab it.',
	tags: ['healing', 'combat', 'medical'],
	rarity: 'uncommon',
	quickAccess: true,
	allowedTags: ['healing_potion', 'bandaid'],
	slots: 10,
	acquiredFrom: ['shop', 'merchant'],
	created_at: '2026-03-31T00:00:00.000Z',
});
