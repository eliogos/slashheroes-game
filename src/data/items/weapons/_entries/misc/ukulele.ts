import { defineWeapon, MISC } from '../../helpers/index.js';

export const ukulele = defineWeapon({
	internalId: 109,
	id: 'ukulele',
	displayName: 'Ukulele',
	description: 'A bard\'s cheerful little instrument that can charm a crowd or crack a skull in a pinch.',
	tags: [
	'cheerful',
	'melodic',
	'nimble',
],
	tier: 1,
	grip: 1,
	families: MISC,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.05,
		edge: 0.76,
		reach: 0.8,
		curvature: 1.15,
	},
	created_at: '2026-03-26T14:07:45.113Z',
});
