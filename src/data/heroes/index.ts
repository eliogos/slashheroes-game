import { bard } from './_classes/bard.js';
import { cleric } from './_classes/cleric.js';
import { mage } from './_classes/mage.js';
import { monk } from './_classes/monk.js';
import { paladin } from './_classes/paladin.js';
import { ranger } from './_classes/ranger.js';
import { rogue } from './_classes/rogue.js';
import { warrior } from './_classes/warrior.js';
import { dwarf } from './_races/dwarf.js';
import { elf } from './_races/elf.js';
import { fairy } from './_races/fairy.js';
import { gnoll } from './_races/gnoll.js';
import { halfling } from './_races/halfling.js';
import { human } from './_races/human.js';
import { kobold } from './_races/kobold.js';
import { orc } from './_races/orc.js';
import { werewolf } from './_races/werewolf.js';
import { agility } from './__stats/agility.js';
import { health } from './__stats/health.js';
import { hunger } from './__stats/hunger.js';
import { intelligence } from './__stats/intelligence.js';
import { luck } from './__stats/luck.js';
import { mana } from './__stats/mana.js';
import { perception } from './__stats/perception.js';
import { stamina } from './__stats/stamina.js';
import { strength } from './__stats/strength.js';
import { wisdom } from './__stats/wisdom.js';

export type {
	ComputedHeroStats,
	HeroClassDefinition,
	HeroDefinition,
	HeroLookupId,
	HeroModifiers,
	HeroRaceDefinition,
	HeroStatDefinition,
	HeroStats,
	HeroStatShortcode,
	HeroStatType,
	ModifierKey,
} from './types.ts';
export { DEFAULT_MODIFIERS, defineHero, defineRace } from './helpers/index.ts';
export { bard, cleric, mage, monk, paladin, ranger, rogue, warrior };
export { dwarf, elf, fairy, gnoll, halfling, human, kobold, orc, werewolf };
export { agility, health, hunger, intelligence, luck, mana, perception, stamina, strength, wisdom };

export const HERO_CLASSES = [warrior, rogue, mage, cleric, ranger, bard, paladin, monk];
export const HERO_RACES = [human, elf, dwarf, orc, halfling, gnoll, kobold, fairy, werewolf];
export const HERO_STATS = [health, stamina, strength, agility, mana, wisdom, intelligence, perception, luck, hunger];
export { DEFAULT_MODIFIERS as HERO_DEFAULT_MODIFIERS } from './helpers/index.ts';
export { computeHeroStats, getClassById, getRaceById } from '../helpers/heroHelper.ts';
