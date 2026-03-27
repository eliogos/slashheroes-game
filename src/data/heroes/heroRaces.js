export const HERO_RACES = [
	{
		id: 1,
		name: 'Human',
		emoji: '🧑',
		summary: 'Jack of all trades, master of none',
		description: 'Humans are probably the most basic among the races. No innate special abilities, no magic, just sheer stubbornness and determination.',
		mods: { str: 0, agi: 0, sta: 0, hp: 0, mp: 0, wis: 0, int: 0, per: 0, luk: 0, hun: 0 }
	},
	{
		id: 2,
		name: 'Elf',
		emoji: '🧝‍♂️',
		summary: 'Graceful, sharp, and a little smug',
		description: 'Elves are long-lived and naturally gifted with magic. They tend to be quicker and more perceptive than most, though centuries of living can make them a little hard to get along with.',
		mods: { str: -1, agi: 2, sta: -1, hp: 1, mp: 2, wis: 1, int: 0, per: 1, luk: -1, hun: -4 }
	},
	{
		id: 3,
		name: 'Dwarf',
		emoji: '⛏️',
		summary: 'Tough as the mountain they came from',
		description: 'Dwarves come from deep underground and it shows. They are tough, strong, and built to outlast just about anything. Not the fastest or the most magical, but incredibly hard to put down.',
		mods: { str: 2, agi: -2, sta: 2, hp: 2, mp: -1, wis: -1, int: -1, per: 0, luk: 0, hun: -1 }
	},
	{
		id: 4,
		name: 'Orc',
		emoji: '🪓',
		summary: 'Built for battle, fueled by pride',
		description: 'Orcs are natural fighters. They hit hard, take hits well, and are not really built for sitting still. If you need something dead, an Orc is a solid choice.',
		mods: { str: 3, agi: -1, sta: 1, hp: 2, mp: -2, wis: -1, int: -1, per: 0, luk: 0, hun: -1 }
	},
	{
		id: 5,
		name: 'Halfling',
		emoji: '🍀',
		summary: 'Small size, big luck.',
		description: 'Halflings are small and not particularly strong, but they make up for it with speed and an unusual amount of luck. Things just tend to work out for them somehow.',
		mods: { str: -2, agi: 2, sta: 0, hp: -1, mp: 0, wis: 0, int: 0, per: 1, luk: 2, hun: -2 }
	},
	{
		id: 6,
		name: 'Gnoll',
		emoji: '🦊',
		summary: 'Cunning, sly, and quick on their feet.',
		description: 'Gnolls are pack hunters by nature. They are quick, strong enough to hold their own, and tend to rely on instinct over strategy. Not the brightest, but they know how to survive.',
		mods: { str: 2, agi: 1, sta: 1, hp: 0, mp: -2, wis: -1, int: -1, per: 1, luk: 0, hun: -1 }
	},
	{
		id: 7,
		name: 'Kobold',
		emoji: '🦎',
		summary: 'Tiny, crafty, and way too confident.',
		description: 'Kobolds are small and physically weak, but they are clever and surprisingly capable with magic. They tend to make up for their size by being annoyingly hard to catch.',
		mods: { str: -2, agi: 2, sta: -1, hp: -1, mp: 1, wis: 1, int: 2, per: 0, luk: 0, hun: -2 }
	},
	{
		id: 8,
		name: 'Fairy',
		emoji: '🧚',
		summary: 'Glitter, giggles, and mischief.',
		description: 'Fairies are fragile but magically powerful. They are fast, wise, and surprisingly sharp — just do not expect them to take anything seriously. High risk, high reward.',
		mods: { str: -3, agi: 3, sta: -2, hp: -2, mp: 3, wis: 2, int: 2, per: 0, luk: -1, hun: -2 }
	},
	{
		id: 9,
		name: 'Werewolf',
		emoji: '🐺',
		summary: 'Loyal heart, wild spirit.',
		description: 'Werewolves are physically one of the strongest races you can pick. Strong, tough, and fast enough to keep up in a fight. The downside is they are not great at anything that requires patience or careful thinking.',
		mods: { str: 3, agi: 1, sta: 2, hp: 2, mp: -2, wis: -2, int: -2, per: 0, luk: -1, hun: -1 }
	}
];