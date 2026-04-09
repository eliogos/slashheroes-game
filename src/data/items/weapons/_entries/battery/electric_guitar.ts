import { defineWeapon, BATTERY, MISC } from '../../helpers/index.js';

export const electric_guitar = defineWeapon({
	internalId: 110,
	id: 'electric_guitar',
	displayName: 'Electric Guitar',
	description: 'A stage weapon that turns amplified feedback, heavy swings, and raw showmanship into damage.',
	tags: [
	'amplified',
	'showy',
	'thunderous',
],
	tier: 5,
	grip: 1,
	families: BATTERY | MISC,
	qualityMultipliers: {
		weight: 1.14,
		speed: 0.98,
		edge: 0.82,
		reach: 0.98,
		curvature: 1.2,
	},
	created_at: '2026-03-26T14:07:45.113Z',
});
