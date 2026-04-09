import { defineWeapon, CURVED_BLADE, FIST } from '../../helpers/index.js';

export const tigerclaw = defineWeapon({
	internalId: 75,
	id: 'tigerclaw',
	displayName: 'Bagh Nakh',
	description: 'A clawed hand weapon that rips targets open during quick slashing flurries.',
	tags: [
	'clawed',
	'feral',
	'ripping',
],
	tier: 4,
	grip: 1,
	families: CURVED_BLADE | FIST,
	qualityMultipliers: {
		weight: 0.88,
		speed: 1.1,
		edge: 1.12,
		reach: 0.82,
		curvature: 1.25,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
