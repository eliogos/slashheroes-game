import { defineWeapon, CURVED_BLADE } from '../../helpers/index.js';

export const machete = defineWeapon({
	internalId: 22,
	id: 'machete',
	displayName: 'Machete',
	description: 'A thick jungle cutter built for repeated chopping through brush and bone.',
	tags: [
	'rugged',
	'broad',
	'relentless',
],
	tier: 2,
	grip: 1,
	families: CURVED_BLADE,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.98,
		edge: 1.03,
		reach: 1.02,
		curvature: 1.12,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
