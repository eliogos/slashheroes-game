import { Armor, ARMOR_TYPE } from '../Armor.js';
const { BOOTS } = ARMOR_TYPE;

export const bootsArmors = [
	new Armor('paper_boots')
		.setInternalId(204)
		.setDisplayName("Origami Oxfords")
		.setType(BOOTS)
		.setMaterial('paper')
		.setDescription("Simple shoes folded from layered paper. Light on the feet, though unlikely to survive rough weather.")
		.setTags('papery', 'flimsy', 'soggy')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bread_boots')
		.setInternalId(208)
		.setDisplayName("Loaf-ers")
		.setType(BOOTS)
		.setMaterial('bread')
		.setDescription("A strange pair of boots shaped from hardened bread. They smell warm, but wear quickly.")
		.setTags('edible', 'crumbly', 'short-lived')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('cardboard_boots')
		.setInternalId(212)
		.setDisplayName("Cardboard Cleats")
		.setType(BOOTS)
		.setMaterial('cardboard')
		.setDescription("Makeshift boots crafted from folded cardboard and twine. Better than bare feet, at least.")
		.setTags('corrugated', 'makeshift', 'brief')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('fabric_boots')
		.setInternalId(216)
		.setDisplayName("Cotton Kicks")
		.setType(BOOTS)
		.setMaterial('fabric')
		.setDescription("Soft cloth footwear stitched for comfort. Common among travelers and villagers alike.")
		.setTags('woven', 'soft', 'comfortable')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('seashells_boots')
		.setInternalId(220)
		.setDisplayName("Shell Sneakers")
		.setType(BOOTS)
		.setMaterial('seashells')
		.setDescription("Boots pieced together from gathered shells. Awkward to walk in, but sturdy enough.")
		.setTags('coastal', 'brittle', 'uneven')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bone_boots')
		.setInternalId(224)
		.setDisplayName("Skeletal Slippers")
		.setType(BOOTS)
		.setMaterial('bone')
		.setDescription("Footwear assembled from polished bone pieces. Grim in appearance, yet surprisingly practical.")
		.setTags('skeletal', 'grim', 'supportive')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('leather_boots')
		.setInternalId(228)
		.setDisplayName("Leather Boots")
		.setType(BOOTS)
		.setMaterial('leather')
		.setDescription("Well-made leather boots trusted by adventurers for their comfort and resilience.")
		.setTags('tanned', 'reliable', 'durable')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('wood_boots')
		.setInternalId(232)
		.setDisplayName("Wooden Clogs")
		.setType(BOOTS)
		.setMaterial('wood')
		.setDescription("Solid wooden footwear carved by hand. Heavy, loud, and built to last.")
		.setTags('carved', 'natural', 'loud')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('scales_boots')
		.setInternalId(236)
		.setDisplayName("Scale Socks")
		.setType(BOOTS)
		.setMaterial('scales')
		.setDescription("Layered scales sewn into flexible footwear, offering both grip and protection.")
		.setTags('reptilian', 'layered', 'gripping')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('chainmail_boots')
		.setInternalId(240)
		.setDisplayName("Chain Flops")
		.setType(BOOTS)
		.setMaterial('chainmail')
		.setDescription("Mail-woven footwear that protects the feet without sacrificing flexibility.")
		.setTags('linked', 'rattling', 'jingly')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('ironplate_boots')
		.setInternalId(244)
		.setDisplayName("Iron Sabatons")
		.setType(BOOTS)
		.setMaterial('ironplate')
		.setDescription("Heavy plated boots forged for warriors who value defense above comfort.")
		.setTags('forged', 'heavy', 'stamina-taxing')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('obsidian_boots')
		.setInternalId(248)
		.setDisplayName("Obsidian Oxfords")
		.setType(BOOTS)
		.setMaterial('obsidian')
		.setDescription("Dark volcanic glass shaped into elegant boots. Beautiful, sharp, and brittle.")
		.setTags('volcanic', 'sharp', 'silent')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('kevlar_boots')
		.setInternalId(252)
		.setDisplayName("Kevlar Kicks")
		.setType(BOOTS)
		.setMaterial('kevlar')
		.setDescription("Modern reinforced boots crafted from advanced fibers for dependable protection.")
		.setTags('synthetic', 'ballistic', 'supported')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('diamondplate_boots')
		.setInternalId(256)
		.setDisplayName("Crystal Cleats")
		.setType(BOOTS)
		.setMaterial('diamondplate')
		.setDescription("Masterworked crystalline boots prized for their unmatched strength and polish.")
		.setTags('crystalline', 'supreme', 'confident')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),
];
