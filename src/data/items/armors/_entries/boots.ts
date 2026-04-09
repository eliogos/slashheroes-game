import { defineArmor } from '../helpers/index.js';

export const bootsArmors = [
	defineArmor({
		internalId: 204,
		displayName: 'Origami Oxfords',
		type: 'boots',
		material: 'paper',
		description: 'Simple shoes folded from layered paper. Light on the feet, though unlikely to survive rough weather.',
		tags: ['papery', 'flimsy', 'soggy'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 208,
		displayName: 'Loaf-ers',
		type: 'boots',
		material: 'bread',
		description: 'A strange pair of boots shaped from hardened bread. They smell warm, but wear quickly.',
		tags: ['edible', 'crumbly', 'short-lived'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 212,
		displayName: 'Cardboard Cleats',
		type: 'boots',
		material: 'cardboard',
		description: 'Makeshift boots crafted from folded cardboard and twine. Better than bare feet, at least.',
		tags: ['corrugated', 'makeshift', 'brief'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 216,
		displayName: 'Cotton Kicks',
		type: 'boots',
		material: 'fabric',
		description: 'Soft cloth footwear stitched for comfort. Common among travelers and villagers alike.',
		tags: ['woven', 'soft', 'comfortable'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 220,
		displayName: 'Shell Sneakers',
		type: 'boots',
		material: 'seashells',
		description: 'Boots pieced together from gathered shells. Awkward to walk in, but sturdy enough.',
		tags: ['coastal', 'brittle', 'uneven'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 224,
		displayName: 'Skeletal Slippers',
		type: 'boots',
		material: 'bone',
		description: 'Footwear assembled from polished bone pieces. Grim in appearance, yet surprisingly practical.',
		tags: ['skeletal', 'grim', 'supportive'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 228,
		displayName: 'Leather Boots',
		type: 'boots',
		material: 'leather',
		description: 'Well-made leather boots trusted by adventurers for their comfort and resilience.',
		tags: ['tanned', 'reliable', 'durable'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 232,
		displayName: 'Wooden Clogs',
		type: 'boots',
		material: 'wood',
		description: 'Solid wooden footwear carved by hand. Heavy, loud, and built to last.',
		tags: ['carved', 'natural', 'loud'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 236,
		displayName: 'Scale Socks',
		type: 'boots',
		material: 'scales',
		description: 'Layered scales sewn into flexible footwear, offering both grip and protection.',
		tags: ['reptilian', 'layered', 'gripping'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 240,
		displayName: 'Chain Flops',
		type: 'boots',
		material: 'chainmail',
		description: 'Mail-woven footwear that protects the feet without sacrificing flexibility.',
		tags: ['linked', 'rattling', 'jingly'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 244,
		displayName: 'Iron Sabatons',
		type: 'boots',
		material: 'ironplate',
		description: 'Heavy plated boots forged for warriors who value defense above comfort.',
		tags: ['forged', 'heavy', 'stamina-taxing'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 248,
		displayName: 'Obsidian Oxfords',
		type: 'boots',
		material: 'obsidian',
		description: 'Dark volcanic glass shaped into elegant boots. Beautiful, sharp, and brittle.',
		tags: ['volcanic', 'sharp', 'silent'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 252,
		displayName: 'Kevlar Kicks',
		type: 'boots',
		material: 'kevlar',
		description: 'Modern reinforced boots crafted from advanced fibers for dependable protection.',
		tags: ['synthetic', 'ballistic', 'supported'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 256,
		displayName: 'Crystal Cleats',
		type: 'boots',
		material: 'diamondplate',
		description: 'Masterworked crystalline boots prized for their unmatched strength and polish.',
		tags: ['crystalline', 'supreme', 'confident'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
] as const;
