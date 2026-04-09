import { defineWeapon, BLUNT, THROWABLE } from '../../helpers/index.js';

export const baseball = defineWeapon({
	internalId: 137,
	id: 'baseball',
	displayName: 'Baseball',
	description: 'A hard little leather ball that goes from harmless pastime to beaning weapon the moment someone throws it with intent.',
	tags: [
	'hardball',
	'sporty',
	'beaning',
],
	tier: 1,
	grip: 0,
	families: BLUNT | THROWABLE,
	qualityMultipliers: {
		weight: 0.72,
		speed: 1.14,
		edge: 0.4,
		reach: 0.76,
		curvature: 1.05,
	},
	effect: {
		type: 'synergy',
		equipment: 'mechaMitt',
		stat: 'damage',
		multiplier: 1.5,
	},
	created_at: '2026-03-26T15:20:00.000Z',
});
