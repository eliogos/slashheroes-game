import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const baton = defineWeapon({
	internalId: 34,
	id: 'baton',
	displayName: 'Baton',
	description: 'A short control weapon made for fast jabs and disciplined strikes.',
	tags: [
	'disciplined',
	'compact',
	'brisk',
],
	tier: 2,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 0.84,
		speed: 1.12,
		reach: 0.82,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
