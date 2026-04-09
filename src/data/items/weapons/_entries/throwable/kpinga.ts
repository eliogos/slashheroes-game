import { defineWeapon, AXE, BLADE, THROWABLE } from '../../helpers/index.js';

export const kpinga = defineWeapon({
	internalId: 135,
	id: 'kpinga',
	displayName: 'Kpinga',
	description: 'A prestigious multi-bladed throwing knife whose ugly silhouette is matched only by the wounds it leaves.',
	tags: [
	'prestigious',
	'barbed',
	'ferocious',
],
	tier: 6,
	grip: 0,
	families: AXE | BLADE | THROWABLE,
	qualityMultipliers: {
		weight: 1.08,
		speed: 1.02,
		edge: 1.14,
		reach: 1.02,
		curvature: 1.18,
	},
	created_at: '2026-03-26T15:10:00.000Z',
});
