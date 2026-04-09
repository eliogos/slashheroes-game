import { defineWeapon, BLADE, THROWABLE } from '../../helpers/index.js';

export const shuriken = defineWeapon({
	internalId: 116,
	id: 'shuriken',
	displayName: 'Shuriken',
	description: 'A star-shaped throwing blade made for quick harassment and sudden cuts from awkward angles.',
	tags: [
	'starry',
	'sudden',
	'harassing',
],
	tier: 2,
	grip: 0,
	families: BLADE | THROWABLE,
	qualityMultipliers: {
		weight: 0.44,
		speed: 1.16,
		edge: 1.04,
		reach: 0.82,
		curvature: 1.05,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
