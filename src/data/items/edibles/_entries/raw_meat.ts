import { Energy } from 'unitsnet-js';

import { defineEdible, SATIATION_TYPE } from '../helpers/index.js';

export const raw_meat = defineEdible({
	internalId: 1,
	id: 'raw_meat',
	displayName: 'Raw Meat',
	description: "A chunk of meat dropped by something that no longer needs it. Edible in theory, but eating it raw is a bad idea. Cook it first. Keep it cold if you can't.",
	tags: ['meat', 'raw', 'perishable'],
	rarity: 'common',
	stackable: 5,
	subtype: 'food',
	satiation: Energy.FromKilocalories(250).Kilocalories,
	satiationType: SATIATION_TYPE.INSTANT,
	form: 'raw',
	requiresCooking: true,
	cookedFormId: 'cooked_meat',
	refrigeratable: true,
	decay: 30,
	effects: [
		{ hook: 'onUse', id: 'food_poison', target: 'self', magnitude: 5, duration: 20, chance: 1.0 },
	],
	created_at: '2026-03-31T00:00:00.000Z',
});
