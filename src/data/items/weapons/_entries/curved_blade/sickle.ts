import { defineWeapon, CURVED_BLADE, TOOL } from '../../helpers/index.js';

export const sickle = defineWeapon({
	internalId: 20,
	id: 'sickle',
	displayName: 'Sickle',
	description: 'A hooked harvesting blade turned into a quick close-range cutter.',
	tags: [
	'hooked',
	'rustic',
	'nimble',
],
	tier: 1,
	grip: 1,
	families: CURVED_BLADE | TOOL,
	qualityMultipliers: {
		weight: 0.84,
		speed: 1.06,
		edge: 0.97,
		reach: 0.78,
		curvature: 1.3,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
