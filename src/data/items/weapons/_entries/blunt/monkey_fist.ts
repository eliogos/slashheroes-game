import { defineWeapon, BLUNT, FIST } from '../../helpers/index.js';

export const monkey_fist = defineWeapon({
	internalId: 116,
	id: 'monkey_fist',
	displayName: 'Monkey Fist',
	description: 'A dense rope-knotted ball swung on a short lead. Hits harder than it looks and leaves a satisfying dent.',
	tags: [
	'knotted',
	'weighted',
	'compact',
],
	tier: 2,
	grip: 1,
	families: BLUNT | FIST,
	qualityMultipliers: {
		weight: 1.08,
		speed: 0.98,
		edge: 1.04,
	},
	created_at: '2026-03-28T00:00:00.000Z',
});
