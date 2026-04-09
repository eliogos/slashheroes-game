import { defineWeapon, BLUNT, POLEARM } from '../../helpers/index.js';

export const lucerne_hammer = defineWeapon({
	internalId: 44,
	id: 'lucerne_hammer',
	displayName: 'Lucerne Hammer',
	description: 'A pole-mounted hammer that extends crushing force deep into formation lines.',
	tags: [
	'martial',
	'elongated',
	'disciplined',
],
	tier: 5,
	grip: 2,
	families: BLUNT | POLEARM,
	qualityMultipliers: {
		weight: 1.1,
		speed: 0.88,
		edge: 1.12,
		reach: 1.22,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
