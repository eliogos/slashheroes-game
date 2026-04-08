import { Potion } from './PotionItem.js';

export const potions = [
	new Potion('small_health_potion')
		.setInternalId(1)
		.setDisplayName('Small Health Potion')
		.setDescription('A simple red restorative brewed for quick battlefield recovery when things start going sideways.')
		.setTags('healing_potion', 'restorative', 'common')
		.setRarity('common')
		.setStackable(20)
		.setVolume(250)
		.setConcentration(0.45)
		.setServings(1)
		.setOnset(0)
		.setDuration(0)
		.setSchool('healing')
		.addEffect({ hook: 'onUse', id: 'heal', target: 'self', magnitude: 25, duration: 0, chance: 1.0 })
		.setMixable()
		.setViscosity(0.2)
		.setContainerType('vial')
		.setPerishable()
		.setShelfLife(180)
		.setSpoilage(0.05)
		.setSpoiledId('inert_vial')
		.setCreatedAt('2026-03-31T00:00:00.000Z'),
];

export const activePotions = potions.filter(entry => !entry.archived);

export function getPotionById(id) {
	return activePotions.find(entry => entry.id === id) ?? null;
}
