import type { HeroModifiers, HeroRaceDefinition } from '../types.js';
import { DEFAULT_MODIFIERS } from './defineHero.js';

type HeroRaceInput = Omit<Partial<HeroRaceDefinition>, 'mods'> &
	Pick<HeroRaceDefinition, 'id' | 'name'> & {
		mods?: Partial<HeroModifiers>;
	};

/** Creates a race definition, applying defaults to omitted fields. */
export function defineRace(race: HeroRaceInput): HeroRaceDefinition {
	return {
		emoji: '',
		summary: '',
		description: '',
		inventorySlots: 0,
		...race,
		mods: {
			...DEFAULT_MODIFIERS,
			...(race.mods ?? {}),
		},
	};
}
