import { Armor, ARMOR_TYPE } from '../Armor.js';
const { LEGGINGS } = ARMOR_TYPE;

export const leggingsArmors = [
	new Armor('paper_leggings')
		.setInternalId(203)
		.setDisplayName("Paper Pants")
		.setType(LEGGINGS)
		.setMaterial('paper')
		.setDescription("Paper tubes wrapped around the legs. They rustle when you walk and crumple when it matters.")
		.setTags('papery', 'flimsy', 'rustling')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bread_leggings')
		.setInternalId(207)
		.setDisplayName("Baguette Boxers")
		.setType(LEGGINGS)
		.setMaterial('bread')
		.setDescription("Baguettes strapped to the thighs. They snap before the enemy does.")
		.setTags('edible', 'crumbly', 'snappy')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('cardboard_leggings')
		.setInternalId(211)
		.setDisplayName("Box-ers")
		.setType(LEGGINGS)
		.setMaterial('cardboard')
		.setDescription("Cardboard strapped to the legs with tape. The tape is structural.")
		.setTags('corrugated', 'makeshift', 'taped')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('fabric_leggings')
		.setInternalId(215)
		.setDisplayName("Padded Leggings")
		.setType(LEGGINGS)
		.setMaterial('fabric')
		.setDescription("Lightweight padded leggings that offer minimal protection and maximum freedom of movement.")
		.setTags('woven', 'soft', 'mobile')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('seashells_leggings')
		.setInternalId(219)
		.setDisplayName("Coral Guards")
		.setType(LEGGINGS)
		.setMaterial('seashells')
		.setDescription("Shell plates across the knees and shins. Crunchy, scratchy, and marginally protective.")
		.setTags('coastal', 'brittle', 'crunchy')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bone_leggings')
		.setInternalId(223)
		.setDisplayName("Femur Guards")
		.setType(LEGGINGS)
		.setMaterial('bone')
		.setDescription("Long bones buckled along the legs. More durable than they look, less than you would hope.")
		.setTags('skeletal', 'grim', 'gapped')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('leather_leggings')
		.setInternalId(227)
		.setDisplayName("Leather Leggings")
		.setType(LEGGINGS)
		.setMaterial('leather')
		.setDescription("Hardened leather greaves that protect without slowing the stride.")
		.setTags('tanned', 'reliable', 'mobile')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('wood_leggings')
		.setInternalId(231)
		.setDisplayName("Plank Guards")
		.setType(LEGGINGS)
		.setMaterial('wood')
		.setDescription("Wooden shin and thigh plates that hold against most blades but restrict movement noticeably.")
		.setTags('carved', 'natural', 'stiff')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('scales_leggings')
		.setInternalId(235)
		.setDisplayName("Scale Chausses")
		.setType(LEGGINGS)
		.setMaterial('scales')
		.setDescription("Scaled leg armor that moves with the wearer and sheds strikes across its surface.")
		.setTags('reptilian', 'layered', 'fluid')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('chainmail_leggings')
		.setInternalId(239)
		.setDisplayName("Chainmail Chausses")
		.setType(LEGGINGS)
		.setMaterial('chainmail')
		.setDescription("Linked metal rings covering the legs completely. Heavy but leaving no gaps to exploit.")
		.setTags('linked', 'rattling', 'complete')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('ironplate_leggings')
		.setInternalId(243)
		.setDisplayName("Iron Greaves")
		.setType(LEGGINGS)
		.setMaterial('ironplate')
		.setDescription("Solid iron leg plates that reduce mobility noticeably in exchange for serious protection.")
		.setTags('forged', 'heavy', 'restricting')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('obsidian_leggings')
		.setInternalId(247)
		.setDisplayName("Obsidian Greaves")
		.setType(LEGGINGS)
		.setMaterial('obsidian')
		.setDescription("Obsidian plates down the legs. Effortlessly deflects blades, dangerously weak against bludgeons.")
		.setTags('volcanic', 'sharp', 'polarizing')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('kevlar_leggings')
		.setInternalId(251)
		.setDisplayName("Kevlar Leggings")
		.setType(LEGGINGS)
		.setMaterial('kevlar')
		.setDescription("Synthetic leg armor tuned for agility under live combat conditions.")
		.setTags('synthetic', 'ballistic', 'agile')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('diamondplate_leggings')
		.setInternalId(255)
		.setDisplayName("Crystal Greaves")
		.setType(LEGGINGS)
		.setMaterial('diamondplate')
		.setDescription("Crystalline leg plates that move with surprising ease given how thoroughly they absorb damage.")
		.setTags('crystalline', 'supreme', 'fluid')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),
];
