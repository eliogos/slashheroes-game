import { describe, it, expect } from 'vitest';
import { computeHeroStats, HeroClass, HeroRace } from '../src/data/heroes/index.js';

describe('hero builder classes', () => {
	it('builds hero classes with fluent modifier helpers', () => {
		const heroClass = new HeroClass(99)
			.setName('Scout')
			.setEmoji('🧭')
			.setSummary('Fast and watchful')
			.setDescription('A test class for fluent hero modifiers.')
			.setPreferredStarterWeapons('dagger', 'shortbow')
			.modifiers
			.strength(1)
			.agility(2)
			.stamina(-1)
			.wisdom(3)
			.intelligence(0)
			.perception(4)
			.luck(1)
			.hunger(-2);

		expect(heroClass).toMatchObject({
			id: 99,
			name: 'Scout',
			emoji: '🧭',
			preferredStarterWeapons: ['dagger', 'shortbow'],
			mods: {
				str: 1,
				agi: 2,
				sta: -1,
				wis: 3,
				int: 0,
				per: 4,
				luk: 1,
				hun: -2
			}
		});
	});

	it('combines race and class modifiers into computed stats', () => {
		const race = new HeroRace(50)
			.setName('Testling')
			.setInventorySlots(11)
			.modifiers
			.strength(1)
			.health(1)
			.mana(2);

		const heroClass = new HeroClass(51)
			.setName('Mystic')
			.modifiers
			.strength(2)
			.wisdom(1);

		const computed = computeHeroStats(race, heroClass);

		expect(race.inventorySlots).toBe(11);
		expect(computed.STR).toBe(13);
		expect(computed.HP).toBe(110);
		expect(computed.MP).toBe(120);
		expect(computed.WIS).toBe(11);
	});
});
