import type { OutcomeType, RoomType, RoomVariant } from '../__types/index.js';

// ── Base room weights ─────────────────────────────────────────────────────────
// Higher = more common. Region modifiers are multiplied in at generation time.

export const BASE_ROOM_WEIGHTS: Record<RoomType, number> = {
	navigation: 30,
	puzzle: 10,
	trap: 9,
	npc: 9,
	shop: 6,
	landmark: 8,
	resource: 8,
	craft: 5,
	alchemy: 5,
	locked_room: 4,
	treasure: 6,
	inn: 3,
	statue: 3,
	boss: 2,
};

// ── Outcome weights per room type ─────────────────────────────────────────────
// Keys are outcomes that can happen; values are relative weights.
// OutcomeType values not listed cannot occur in that room type.

export const ROOM_OUTCOME_WEIGHTS: Record<RoomType, Partial<Record<OutcomeType, number>>> = {
	// Catch-all rooms — combat and traps are the main risks
	navigation: {
		combat: 26,
		loot: 16,
		key: 5,
		trap: 9,
		traveling_merchant: 7,
		nothing: 37,
	},

	// Puzzle itself is the room; loot is the reward once solved
	puzzle: {
		loot: 50,
		nothing: 50,
	},

	// Traps are always active — that's the whole point
	trap: {
		trap: 100,
	},

	// NPCs — mostly dialogue/quests but can turn hostile
	npc: {
		combat: 18,
		nothing: 82,
	},

	// Shop rooms are purely interaction-driven
	shop: {
		nothing: 100,
	},

	// Landmarks let players drop items/notes; rare chance of residual loot
	landmark: {
		loot: 10,
		traveling_merchant: 5,
		nothing: 85,
	},

	// Resource rooms are loot-heavy; keys can hide here; monsters guard supplies
	resource: {
		loot: 65,
		key: 18,
		combat: 17,
	},

	// Crafting is the interaction — no random outcomes
	craft: {
		nothing: 100,
	},

	// Alchemy is the interaction — no random outcomes
	alchemy: {
		nothing: 100,
	},

	// Behind the locked door: mostly loot, occasional guardian
	locked_room: {
		loot: 60,
		combat: 30,
		nothing: 10,
	},

	// Treasure rooms: high loot chance, mimic risk
	treasure: {
		loot: 72,
		mimic: 28,
	},

	// Inn is a safe zone — always nothing (rest/buy food is the mechanic)
	inn: {
		nothing: 100,
	},

	// Statues grant blessings on prayer — no hostile outcomes
	statue: {
		nothing: 100,
	},

	// Boss rooms always have a fight
	boss: {
		combat: 100,
	},
};

// ── Room name / description variants ─────────────────────────────────────────
// Multiple variants per room type so repeated rooms feel different.
// The generator picks one deterministically from the channel hash.

export const ROOM_VARIANTS: Record<RoomType, RoomVariant[]> = {
	navigation: [
		{
			name: 'Empty Corridor',
			description:
				'A long, silent corridor stretching into darkness. Footsteps echo against the stone walls.',
		},
		{
			name: 'Winding Path',
			description: 'A path that twists and turns without shelter or cover in sight.',
		},
		{
			name: 'Collapsed Passage',
			description: 'Rubble lines the sides of this partially collapsed tunnel. Navigable, but just.',
		},
		{
			name: 'Dim Hallway',
			description: 'A dim hallway with faded markings scratched into the wall by previous explorers.',
		},
		{
			name: 'Flooded Passage',
			description:
				'Ankle-deep water slows your pace. Something moves in the murk beneath the surface.',
		},
	],

	puzzle: [
		{
			name: 'Puzzle Chamber',
			description:
				"Strange symbols and mechanisms line the walls. This room won't yield its secrets easily.",
		},
		{
			name: 'Riddle Room',
			description: 'An inscription on the door poses a riddle. Only the worthy may pass.',
		},
		{
			name: 'Cipher Lock',
			description: 'A complex cipher mechanism seals the path forward.',
		},
		{
			name: 'Mirrored Hall',
			description:
				'Reflections shift and distort. The puzzle here is one of perception, not brute force.',
		},
	],

	trap: [
		{
			name: 'Spike Trap',
			description:
				'Telltale holes in the floor mark this room as dangerous. Best to step very carefully.',
		},
		{
			name: 'Pressure Plate Hall',
			description: 'Subtly raised stones dot the floor. Veterans recognise the pattern immediately.',
		},
		{
			name: 'Swinging Blades',
			description:
				'Mechanisms in the ceiling hint at blades that activate when the floor is disturbed.',
		},
		{
			name: 'Gas Vent Room',
			description: 'Faint hissing vents near the floor. The air tastes faintly bitter.',
		},
	],

	npc: [
		{
			name: 'Wandering Stranger',
			description: 'A figure hunches in the corner, looking up as you enter.',
		},
		{
			name: 'Hidden Camp',
			description:
				'Signs of habitation — a bedroll, scattered belongings. Someone was here recently.',
		},
		{
			name: "Survivor's Alcove",
			description: 'A haggard survivor has made this room their base. They look desperate.',
		},
		{
			name: 'Patrol Post',
			description:
				'A lone guard or scout from a faction you may or may not recognise. They eye you carefully.',
		},
	],

	shop: [
		{
			name: 'Trading Post',
			description: 'A well-lit stall stocked with goods. A shopkeeper eyes you from behind the counter.',
		},
		{
			name: 'Dungeon Market',
			description:
				'A makeshift shop set up in a cleared-out room. The proprietor looks expectant.',
		},
		{
			name: "Merchant's Den",
			description:
				"Someone has turned this room into a proper storefront. They're open for business.",
		},
	],

	landmark: [
		{
			name: 'Ancient Monument',
			description:
				'A stone monument stands in the centre, worn smooth by centuries of passing hands.',
		},
		{
			name: 'Graffiti Wall',
			description: 'The walls are covered in inscriptions left by previous explorers.',
		},
		{
			name: 'Memorial Stone',
			description: 'A carved memorial stone commemorates something long forgotten.',
		},
		{
			name: 'Cairn of the Lost',
			description:
				'Stones stacked in silent tribute. Adventurers have been leaving messages pinned beneath them.',
		},
	],

	resource: [
		{
			name: 'Supply Cache',
			description:
				'Scattered crates and barrels suggest someone once stashed supplies here.',
		},
		{
			name: 'Ore Vein',
			description: 'Glittering mineral veins run through the walls, ready to be harvested.',
		},
		{
			name: 'Foraging Grounds',
			description: 'Edible fungi and useful plants grow in surprising abundance here.',
		},
		{
			name: 'Abandoned Stockroom',
			description: 'Shelves of old provisions, most rotted — but not everything.',
		},
	],

	craft: [
		{
			name: 'Workshop',
			description: 'A functional workbench covered in tools. Someone left mid-project.',
		},
		{
			name: "Smith's Corner",
			description: 'A crude forge still holds residual heat. The equipment is worn but usable.',
		},
		{
			name: "Tinker's Nook",
			description: "Gears, springs, and half-finished contraptions litter every surface.",
		},
	],

	alchemy: [
		{
			name: "Alchemist's Nook",
			description: 'Glass vials and reagent pouches clutter every surface. The smell is pungent.',
		},
		{
			name: 'Brewing Station',
			description: 'A bubbling cauldron sits atop a magical flame. Ingredients line the shelves.',
		},
		{
			name: 'Apothecary Corner',
			description: 'Dried herbs hang from the ceiling and labelled jars crowd the shelves.',
		},
	],

	locked_room: [
		{
			name: 'Sealed Chamber',
			description: 'A heavy iron door bars the way. The lock is old but very much intact.',
		},
		{
			name: 'Barred Gate',
			description: 'Iron bars seal this entrance. A keyhole is visible on the rightmost bar.',
		},
		{
			name: 'Warded Vault',
			description: 'A door marked with faint magical seals. It needs a key from within this dungeon.',
		},
	],

	treasure: [
		{
			name: 'Treasure Vault',
			description: 'Chests and sacks overflow with glinting coins and artifacts.',
		},
		{
			name: 'Hoard Room',
			description: 'An enormous pile of valuables dominates the centre of the room.',
		},
		{
			name: 'Prize Chamber',
			description:
				'Carefully arranged shelves display weapons, jewellery, and other valuables. Unguarded? Unlikely.',
		},
	],

	inn: [
		{
			name: 'Safe Haven',
			description:
				'A surprisingly cosy alcove with hammocks and a glowing hearth. Rest is possible here.',
		},
		{
			name: 'Underground Inn',
			description: 'Someone has built a proper inn down here, complete with beds and a menu.',
		},
		{
			name: "Wanderer's Rest",
			description:
				'A neutral zone recognised by all factions — no fighting, no stealing. Just rest.',
		},
	],

	statue: [
		{
			name: 'Shrine of the Fallen',
			description: 'A weathered statue of an unknown warrior stands in silent vigil.',
		},
		{
			name: 'Divine Effigy',
			description: 'A towering effigy radiates faint divine energy. Praying here feels significant.',
		},
		{
			name: 'Forgotten Idol',
			description:
				'A carved idol whose deity has been forgotten. The power here still feels very real.',
		},
	],

	boss: [
		{
			name: 'Boss Chamber',
			description:
				'The air is heavy with malice. Something powerful waits beyond the mist.',
		},
		{
			name: 'Final Gate',
			description:
				'Massive doors stand ajar. Whatever lives beyond is ancient and very dangerous.',
		},
		{
			name: "Warlord's Throne",
			description:
				'A vast hall centred on a throne of bones. The occupant is still very much present.',
		},
	],
};
