import { defineWeapon, FIST } from '../../helpers/index.js';

export const gloves = defineWeapon({
	internalId: 72,
	id: 'gloves',
	displayName: 'Studded Gloves',
	description: 'Reinforced gloves with knuckle studs that turn every punch into something the other guy remembers.',
	tags: [
	'studded',
	'reinforced',
	'humble',
],
	tier: 1,
	grip: 1,
	families: FIST,
	qualityMultipliers: {
		weight: 0.92,
		speed: 1.02,
		edge: 0.96,
		reach: 0.9,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
