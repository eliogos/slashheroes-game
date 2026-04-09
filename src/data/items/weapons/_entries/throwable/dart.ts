import { defineWeapon, MISC, THROWABLE } from '../../helpers/index.js';

export const dart = defineWeapon({
	internalId: 115,
	id: 'dart',
	displayName: 'Dart',
	description: 'A slim hand-thrown spike built for quick releases, shallow arcs, and irritatingly accurate hits.',
	tags: [
	'slim',
	'accurate',
	'snappy',
],
	tier: 1,
	grip: 0,
	families: MISC | THROWABLE,
	qualityMultipliers: {
		weight: 0.38,
		speed: 1.18,
		edge: 1.08,
		reach: 0.72,
		curvature: 0.9,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
