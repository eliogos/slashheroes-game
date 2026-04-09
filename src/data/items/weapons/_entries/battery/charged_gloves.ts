import { defineWeapon, BATTERY, FIST } from '../../helpers/index.js';

export const charged_gloves = defineWeapon({
	internalId: 73,
	id: 'charged_gloves',
	displayName: 'Charged Gloves',
	description: 'Powered gloves that crackle on impact and sharpen close-range bursts.',
	tags: [
	'charged',
	'crackling',
	'volatile',
],
	tier: 2,
	grip: 1,
	families: BATTERY | FIST,
	qualityMultipliers: {
		weight: 0.98,
		speed: 1.05,
		edge: 1.02,
		reach: 0.92,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
