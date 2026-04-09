import { defineWeapon, MISC, THROWABLE, TOOL } from '../../helpers/index.js';

export const molotov = defineWeapon({
	internalId: 122,
	id: 'molotov',
	displayName: 'Molotov',
	description: 'A bottle of burning liquid that turns a desperate throw into spreading fire and chaos.',
	tags: [
	'burning',
	'desperate',
	'spreading',
],
	tier: 3,
	grip: 0,
	families: MISC | TOOL | THROWABLE,
	qualityMultipliers: {
		weight: 0.82,
		speed: 1.02,
		edge: 0.84,
		reach: 0.88,
		curvature: 1.05,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
