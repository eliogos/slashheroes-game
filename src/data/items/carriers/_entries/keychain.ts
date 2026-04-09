import { defineCarrier } from '../helpers/index.js';

export const keychain = defineCarrier({
	internalId: 4,
	id: 'keychain',
	displayName: 'Keychain',
	description: 'A modest ring of metal links that clips to a belt loop. Every key goes on it. Every single one. No more rattling around your bag looking for the right one.',
	tags: ['key', 'belt', 'utility'],
	rarity: 'common',
	quickAccess: true,
	allowedTypes: ['key'],
	acquiredFrom: ['shop', 'merchant'],
	created_at: '2026-03-31T00:00:00.000Z',
});
