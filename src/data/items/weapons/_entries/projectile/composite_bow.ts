import { defineWeapon, PROJECTILE } from '../../helpers/index.js';

export const composite_bow = defineWeapon({
	internalId: 71,
	id: 'composite_bow',
	displayName: 'Composite Bow',
	description: 'A reinforced high-end bow delivering strong output without sacrificing control.',
	tags: [
	'reinforced',
	'elite',
	'resilient',
],
	tier: 6,
	grip: 2,
	families: PROJECTILE,
	qualityMultipliers: {
		weight: 0.98,
		speed: 1.08,
		reach: 1.16,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
