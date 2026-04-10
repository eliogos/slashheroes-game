import { Energy } from 'unitsnet-js';

import { defineEdible, defineVariant, SATIATION_TYPE } from '../helpers/index.js';

const createdAt = '2026-03-31T00:00:00.000Z';

const meat = defineEdible({
	internalId: 1,
	id: 'meat',
	displayName: 'Meat',
	description: 'A reusable meat base used to build different prepared and spoiled variants.',
	tags: ['meat', 'perishable'],
	rarity: 'common',
	stackable: 5,
	subtype: 'food',
	satiation: Energy.FromKilocalories(250).Kilocalories,
	satiationType: SATIATION_TYPE.INSTANT,
	form: 'raw',
	refrigeratable: true,
	decay: 30,
	created_at: createdAt,
});

export const raw_meat = defineVariant(meat, {
	id: 'raw_meat',
	displayName: 'Raw Meat',
	description: "A chunk of meat dropped by something that no longer needs it. Edible in theory, but eating it raw is a bad idea. Cook it first. Keep it cold if you can't.",
	tags: ['raw'],
	requiresCooking: true,
	cookedFormId: 'cooked_meat',
	effects: [
		{ hook: 'onUse', id: 'food_poison', target: 'self', magnitude: 5, duration: 20, chance: 1.0 },
	],
});

export const cooked_meat = defineVariant(meat, {
	id: 'cooked_meat',
	displayName: 'Cooked Meat',
	description: "Properly cooked over a fire. Filling, safe, and decent enough that you don't think too hard about where it came from.",
	tags: ['cooked'],
	satiation: Energy.FromKilocalories(400).Kilocalories,
	satiationType: SATIATION_TYPE.STEADY,
	form: 'cooked',
	decay: 100,
	effects: [],
});

export const honeyed_steak = defineVariant(meat, {
	id: 'honeyed_steak',
	displayName: 'Honeyed Steak',
	description: 'Cooked meat glazed with honey. Surprisingly good. The sweetness cuts through the fat and somehow makes it feel worth the effort. Gives a noticeable burst of stamina.',
	tags: ['cooked', 'honey'],
	rarity: 'uncommon',
	stackable: 3,
	satiation: Energy.FromKilocalories(520).Kilocalories,
	satiationType: SATIATION_TYPE.BOOST,
	form: 'glazed',
	decay: 80,
	effects: [
		{ hook: 'onUse', id: 'stamina_boost', target: 'self', magnitude: 30, duration: 50, chance: 1.0 },
	],
});

export const rotten_meat = defineVariant(meat, {
	id: 'rotten_meat',
	displayName: 'Rotten Meat',
	description: 'Spoiled meat that smells wrong and fights back against your stomach. It removes energy instead of giving it and usually makes things worse.',
	tags: ['rotten'],
	satiation: Energy.FromKilocalories(-120).Kilocalories,
	satiationType: SATIATION_TYPE.INSTANT,
	form: 'rotten',
	decay: 0,
	requiresCooking: false,
	cookedFormId: null,
	effects: [
		{ hook: 'onUse', id: 'food_poison', target: 'self', magnitude: 10, duration: 35, chance: 1.0 },
	],
});
