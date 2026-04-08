import { Scroll } from './ScrollItem.js';

export const scrolls = [
	new Scroll('mysterious_scroll')
		.setInternalId(1)
		.setDisplayName('Mysterious Scroll')
		.setDescription('A sealed arcane scroll covered in symbols that seem to rearrange themselves every time you blink.')
		.setTags('scroll', 'arcane', 'unstable')
		.setRarity('common')
		.setStackable(10)
		.setSpellId('random_spell')
		.setSchool('arcane')
		.setCharges(1)
		.setCastTime(1)
		.setIntelligenceRequirement(0)
		.setFailChance(0.05)
		.setFragile()
		.setSingleUse()
		.addEffect({ hook: 'onUse', id: 'cast_random_spell', target: 'self', magnitude: 1, duration: 0, chance: 1.0 })
		.setCreatedAt('2026-03-31T00:00:00.000Z'),
];

export const activeScrolls = scrolls.filter(entry => !entry.archived);

export function getScrollById(id) {
	return activeScrolls.find(entry => entry.id === id) ?? null;
}
