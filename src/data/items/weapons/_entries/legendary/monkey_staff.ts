import { defineWeapon, LEGENDARY, STAFF } from '../../helpers/index.js';

export const monkey_staff = defineWeapon({
	internalId: 89,
	id: 'monkey_staff',
	displayName: 'Ruyi Jingu Bang',
	description: 'A mythic staff of impossible mastery, famous for overwhelming reach and power.',
	tags: [
	'mythic',
	'sovereign',
	'overwhelming',
],
	tier: 6,
	grip: 2,
	families: LEGENDARY | STAFF,
	qualityMultipliers: {
		weight: 1.18,
		speed: 1.08,
		edge: 1.06,
		reach: 1.28,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
