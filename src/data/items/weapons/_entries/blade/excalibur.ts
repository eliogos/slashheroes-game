import { defineWeapon, BLADE, LEGENDARY } from '../../helpers/index.js';

export const excalibur = defineWeapon({
	internalId: 19,
	id: 'excalibur',
	displayName: 'Excalibur',
	description: 'A legendary sword of impossible poise and power, answering only a worthy bearer.',
	tags: [
	'hallowed',
	'regal',
	'fated',
],
	tier: 6,
	grip: 2,
	families: BLADE | LEGENDARY,
	qualityMultipliers: {
		weight: 1.03,
		speed: 1.08,
		edge: 1.12,
		reach: 1.1,
		curvature: 1.25,
	},
	created_at: '2026-03-26T13:45:32.803Z',
});
