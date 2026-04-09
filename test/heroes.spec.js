import { describe, expect, it } from 'vitest';
import { computeHeroStats, defineHero, defineRace } from '../src/data/heroes/index.ts';

describe('hero definition helpers', () => {
	it('fills missing hero fields with defaults', () => {
		const heroClass = defineHero({
			id: 99,
			name: 'Warrior',
			emoji: '⚔️',
			summary: 'Brave, relentless, and mighty',
			description: 'A test class using the default Warrior-style data shape.',
			preferredStarterWeapons: ['dagger', 'shortbow'],
			mods: {
				str: 1,
				agi: 2,
				sta: -1,
				wis: 3,
				int: 0,
				per: 4,
				luk: 1,
				hun: -2,
			},
		});

		expect(heroClass).toMatchObject({
			id: 99,
			name: 'Warrior',
			emoji: '⚔️',
			preferredStarterWeapons: ['dagger', 'shortbow'],
			mods: {
				str: 1,
				agi: 2,
				sta: -1,
				hp: 0,
				mp: 0,
				wis: 3,
				int: 0,
				per: 4,
				luk: 1,
				hun: -2,
			},
		});
	});

	it('combines race and class modifiers into computed stats', () => {
		const race = defineRace({
			id: 50,
			name: 'Human',
			inventorySlots: 11,
			mods: {
				str: 1,
				hp: 1,
				mp: 2,
			},
		});

		const heroClass = defineHero({
			id: 51,
			name: 'Warrior',
			mods: {
				str: 2,
				wis: 1,
			},
		});

		const computed = computeHeroStats(race, heroClass);

		expect(race.inventorySlots).toBe(11);
		expect(computed.STR).toBe(13);
		expect(computed.HP).toBe(110);
		expect(computed.MP).toBe(120);
		expect(computed.WIS).toBe(11);
	});
});
