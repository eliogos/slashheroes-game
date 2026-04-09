import { definePotion } from '../helpers/index.js';

export const small_health_potion = definePotion({
	internalId: 1,
	id: 'small_health_potion',
	displayName: 'Small Health Potion',
	description: 'A simple red restorative brewed for quick battlefield recovery when things start going sideways.',
	tags: ['healing_potion', 'restorative', 'common'],
	rarity: 'common',
	stackable: 20,
	volume: 250,
	concentration: 0.45,
	servings: 1,
	onset: 0,
	duration: 0,
	school: 'healing',
	effects: [
		{ hook: 'onUse', id: 'heal', target: 'self', magnitude: 25, duration: 0, chance: 1.0 },
	],
	mixable: true,
	viscosity: 0.2,
	containerType: 'vial',
	perishable: true,
	shelfLife: 180,
	spoilage: 0.05,
	spoiledId: 'inert_vial',
	created_at: '2026-03-31T00:00:00.000Z',
});
