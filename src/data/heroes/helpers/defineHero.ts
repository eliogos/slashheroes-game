import type { HeroClassDefinition, HeroModifiers } from '../types.js';

export const DEFAULT_MODIFIERS: Readonly<HeroModifiers> = {
	str: 0,
	agi: 0,
	sta: 0,
	hp: 0,
	mp: 0,
	wis: 0,
	int: 0,
	per: 0,
	luk: 0,
	hun: 0,
};

type HeroClassInput = Omit<Partial<HeroClassDefinition>, 'mods'> &
	Pick<HeroClassDefinition, 'id' | 'name'> & {
		mods?: Partial<HeroModifiers>;
	};

/** Create a hero class definition while filling omitted fields with sensible defaults. */
export function defineHero(hero: HeroClassInput): HeroClassDefinition {
	return {
		emoji: '',
		summary: '',
		description: '',
		preferredStarterWeapons: [],
		preferredWeaponFamilyId: null,
		...hero,
		mods: {
			...DEFAULT_MODIFIERS,
			...(hero.mods ?? {}),
		},
	};
}
