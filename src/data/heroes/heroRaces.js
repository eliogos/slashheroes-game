import { HeroDefinition } from './heroClasses.js';

export class HeroRace extends HeroDefinition {
	constructor(id) {
		super(id);
		this.inventorySlots = 0;
	}

	setInventorySlots(value) {
		this.inventorySlots = value;
		return this;
	}
}

export const HERO_RACES = [
	new HeroRace(1)
		.setName('Human')
		.setEmoji('🧑')
		.setSummary('Jack of all trades, master of none')
		.setDescription('Humans are the most basic among the races. No innate special abilities, no magic, just sheer stubbornness and determination.')
		.setInventorySlots(12)
		.modifiers
		.strength(0)
		.agility(0)
		.stamina(0)
		.health(0)
		.mana(0)
		.wisdom(0)
		.intelligence(0)
		.perception(0)
		.luck(0)
		.hunger(0),

	new HeroRace(2)
		.setName('Elf')
		.setEmoji('🧝‍♂️')
		.setSummary('Graceful, sharp, and a little smug')
		.setDescription('Elves are long-lived and naturally gifted with magic. They tend to be quicker and more perceptive than most, though centuries of living can make them a little hard to get along with.')
		.setInventorySlots(11)
		.modifiers
		.strength(-1)
		.agility(2)
		.stamina(-1)
		.health(1)
		.mana(2)
		.wisdom(1)
		.intelligence(0)
		.perception(1)
		.luck(-1)
		.hunger(-4),

	new HeroRace(3)
		.setName('Dwarf')
		.setEmoji('⛏️')
		.setSummary('Tough as the mountain they came from')
		.setDescription('Dwarves come from deep underground and it shows. They are tough, strong, and built to outlast just about anything. Not the fastest or the most magical, but incredibly hard to put down.')
		.setInventorySlots(13)
		.modifiers
		.strength(2)
		.agility(-2)
		.stamina(2)
		.health(2)
		.mana(-1)
		.wisdom(-1)
		.intelligence(-1)
		.perception(0)
		.luck(0)
		.hunger(-1),

	new HeroRace(4)
		.setName('Orc')
		.setEmoji('🪓')
		.setSummary('Built for battle, fueled by pride')
		.setDescription('Orcs are a warrior race, raised in clans where strength and combat are a way of life. They are physically imposing and built to take punishment as well as dish it out.')
		.setInventorySlots(15)
		.modifiers
		.strength(3)
		.agility(-1)
		.stamina(1)
		.health(2)
		.mana(-2)
		.wisdom(-1)
		.intelligence(-1)
		.perception(0)
		.luck(0)
		.hunger(-1),

	new HeroRace(5)
		.setName('Halfling')
		.setEmoji('🍀')
		.setSummary('Small size, big luck.')
		.setDescription('Halflings are small and not particularly strong, but they make up for it with speed and an unusual amount of luck. Things just tend to work out for them somehow.')
		.setInventorySlots(10)
		.modifiers
		.strength(-2)
		.agility(2)
		.stamina(0)
		.health(-1)
		.mana(0)
		.wisdom(0)
		.intelligence(0)
		.perception(1)
		.luck(2)
		.hunger(-2),

	new HeroRace(6)
		.setName('Gnoll')
		.setEmoji('🦊')
		.setSummary('Cunning, sly, and quick on their feet.')
		.setDescription('Gnolls are pack hunters by nature. They are quick, strong enough to hold their own, and tend to rely on instinct over strategy. Not the brightest, but they know how to survive.')
		.setInventorySlots(12)
		.modifiers
		.strength(2)
		.agility(1)
		.stamina(1)
		.health(0)
		.mana(-2)
		.wisdom(-1)
		.intelligence(-1)
		.perception(1)
		.luck(0)
		.hunger(-1),

	new HeroRace(7)
		.setName('Kobold')
		.setEmoji('🦎')
		.setSummary('Tiny, crafty, and way too confident.')
		.setDescription('Kobolds are small and physically weak, but they are clever and surprisingly capable with magic. They tend to make up for their size by being annoyingly hard to catch.')
		.setInventorySlots(9)
		.modifiers
		.strength(-2)
		.agility(2)
		.stamina(-1)
		.health(-1)
		.mana(1)
		.wisdom(1)
		.intelligence(2)
		.perception(0)
		.luck(0)
		.hunger(-2),

	new HeroRace(8)
		.setName('Fairy')
		.setEmoji('🧚')
		.setSummary('Glitter, giggles, and mischief.')
		.setDescription('Fairies are ancient nature spirits. Magically powerful and surprisingly wise, though they are also fragile and tend to follow their whims more than any plan.')
		.setInventorySlots(8)
		.modifiers
		.strength(-3)
		.agility(3)
		.stamina(-2)
		.health(-2)
		.mana(3)
		.wisdom(2)
		.intelligence(2)
		.perception(0)
		.luck(-1)
		.hunger(-2),
		
	new HeroRace(9)
		.setName('Werewolf')
		.setEmoji('🐺')
		.setSummary('Loyal heart, wild spirit.')
		.setDescription('Werewolves carry a beast within them that never fully rests. They are physically powerful and fiercely loyal to those they consider pack. The curse is real, but so is everything that comes with it.')
		.setInventorySlots(13)
		.modifiers
		.strength(3)
		.agility(1)
		.stamina(2)
		.health(2)
		.mana(-2)
		.wisdom(-2)
		.intelligence(-2)
		.perception(0)
		.luck(-1)
		.hunger(-1)
];