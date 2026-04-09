import { defineWeapon, FIREARM } from '../../helpers/index.js';

export const handcannon = defineWeapon({
	internalId: 82,
	id: 'handcannon',
	displayName: 'Handcannon',
	description: 'A heavy short-range gun that trades finesse for outrageous stopping power.',
	tags: [
	'heavy',
	'outrageous',
	'brutal',
],
	tier: 5,
	grip: 1,
	families: FIREARM,
	qualityMultipliers: {
		weight: 1.2,
		speed: 0.86,
		reach: 0.82,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
