export const HERO_RACES = [
	{
		id: 1,
		name: 'Human',
		emoji: '🧑',
		summary: 'Jack of all trades, master of none',
		description: 'Humans are the most basic among the races. No innate special abilities, no magic, just sheer stubbornness and determination.',
		inventorySlots: 12,
		mods: { str: 0, agi: 0, sta: 0, hp: 0, mp: 0, wis: 0, int: 0, per: 0, luk: 0, hun: 0 }
	},
	{
		id: 2,
		name: 'Elf',
		emoji: '🧝‍♂️',
		summary: 'Graceful, sharp, and a little smug',
		description: 'Elves are long-lived and naturally gifted with magic. They tend to be quicker and more perceptive than most, though centuries of living can make them a little hard to get along with.',
		inventorySlots: 11,
		mods: { str: -1, agi: 2, sta: -1, hp: 1, mp: 2, wis: 1, int: 0, per: 1, luk: -1, hun: -4 }
	},
	{
		id: 3,
		name: 'Dwarf',
		emoji: '⛏️',
		summary: 'Tough as the mountain they came from',
		description: 'Dwarves come from deep underground and it shows. They are tough, strong, and built to outlast just about anything. Not the fastest or the most magical, but incredibly hard to put down.',
		inventorySlots: 13,
		mods: { str: 2, agi: -2, sta: 2, hp: 2, mp: -1, wis: -1, int: -1, per: 0, luk: 0, hun: -1 }
	},
	{
		id: 4,
		name: 'Orc',
		emoji: '🪓',
		summary: 'Built for battle, fueled by pride',
		description: 'Orcs are a warrior race, raised in clans where strength and combat are a way of life. They are physically imposing and built to take punishment as well as dish it out.',
		inventorySlots: 15,
		mods: { str: 3, agi: -1, sta: 1, hp: 2, mp: -2, wis: -1, int: -1, per: 0, luk: 0, hun: -1 }
	},
	{
		id: 5,
		name: 'Halfling',
		emoji: '🍀',
		summary: 'Small size, big luck.',
		description: 'Halflings are small and not particularly strong, but they make up for it with speed and an unusual amount of luck. Things just tend to work out for them somehow.',
		inventorySlots: 10,
		mods: { str: -2, agi: 2, sta: 0, hp: -1, mp: 0, wis: 0, int: 0, per: 1, luk: 2, hun: -2 }
	},
	{
		id: 6,
		name: 'Gnoll',
		emoji: '🦊',
		summary: 'Cunning, sly, and quick on their feet.',
		description: 'Gnolls are pack hunters by nature. They are quick, strong enough to hold their own, and tend to rely on instinct over strategy. Not the brightest, but they know how to survive.',
		inventorySlots: 12,
		mods: { str: 2, agi: 1, sta: 1, hp: 0, mp: -2, wis: -1, int: -1, per: 1, luk: 0, hun: -1 }
	},
	{
		id: 7,
		name: 'Kobold',
		emoji: '🦎',
		summary: 'Tiny, crafty, and way too confident.',
		description: 'Kobolds are small and physically weak, but they are clever and surprisingly capable with magic. They tend to make up for their size by being annoyingly hard to catch.',
		inventorySlots: 9,
		mods: { str: -2, agi: 2, sta: -1, hp: -1, mp: 1, wis: 1, int: 2, per: 0, luk: 0, hun: -2 }
	},
	{
		id: 8,
		name: 'Fairy',
		emoji: '🧚',
		summary: 'Glitter, giggles, and mischief.',
		description: 'Fairies are ancient nature spirits. Magically powerful and surprisingly wise, though they are also fragile and tend to follow their whims more than any plan.',
		inventorySlots: 8,
		mods: { str: -3, agi: 3, sta: -2, hp: -2, mp: 3, wis: 2, int: 2, per: 0, luk: -1, hun: -2 }
	},
	{
		id: 9,
		name: 'Werewolf',
		emoji: '🐺',
		summary: 'Loyal heart, wild spirit.',
		description: 'Werewolves carry a beast within them that never fully rests. They are physically powerful and fiercely loyal to those they consider pack. The curse is real, but so is everything that comes with it.',
		inventorySlots: 13,
		mods: { str: 3, agi: 1, sta: 2, hp: 2, mp: -2, wis: -2, int: -2, per: 0, luk: -1, hun: -1 }
	}
];