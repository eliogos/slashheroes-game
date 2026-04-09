import { defineArmor } from '../helpers/index.js';

export const leggingsArmors = [
	defineArmor({
		internalId: 203,
		displayName: 'Paper Pants',
		type: 'leggings',
		material: 'paper',
		description: 'Paper tubes wrapped around the legs. They rustle when you walk and crumple when it matters.',
		tags: ['papery', 'flimsy', 'rustling'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 207,
		displayName: 'Baguette Boxers',
		type: 'leggings',
		material: 'bread',
		description: 'Baguettes strapped to the thighs. They snap before the enemy does.',
		tags: ['edible', 'crumbly', 'snappy'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 211,
		displayName: 'Box-ers',
		type: 'leggings',
		material: 'cardboard',
		description: 'Cardboard strapped to the legs with tape. The tape is structural.',
		tags: ['corrugated', 'makeshift', 'taped'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 215,
		displayName: 'Padded Leggings',
		type: 'leggings',
		material: 'fabric',
		description: 'Lightweight padded leggings that offer minimal protection and maximum freedom of movement.',
		tags: ['woven', 'soft', 'mobile'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 219,
		displayName: 'Coral Guards',
		type: 'leggings',
		material: 'seashells',
		description: 'Shell plates across the knees and shins. Crunchy, scratchy, and marginally protective.',
		tags: ['coastal', 'brittle', 'crunchy'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 223,
		displayName: 'Femur Guards',
		type: 'leggings',
		material: 'bone',
		description: 'Long bones buckled along the legs. More durable than they look, less than you would hope.',
		tags: ['skeletal', 'grim', 'gapped'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 227,
		displayName: 'Leather Leggings',
		type: 'leggings',
		material: 'leather',
		description: 'Hardened leather greaves that protect without slowing the stride.',
		tags: ['tanned', 'reliable', 'mobile'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 231,
		displayName: 'Plank Guards',
		type: 'leggings',
		material: 'wood',
		description: 'Wooden shin and thigh plates that hold against most blades but restrict movement noticeably.',
		tags: ['carved', 'natural', 'stiff'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 235,
		displayName: 'Scale Chausses',
		type: 'leggings',
		material: 'scales',
		description: 'Scaled leg armor that moves with the wearer and sheds strikes across its surface.',
		tags: ['reptilian', 'layered', 'fluid'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 239,
		displayName: 'Chainmail Chausses',
		type: 'leggings',
		material: 'chainmail',
		description: 'Linked metal rings covering the legs completely. Heavy but leaving no gaps to exploit.',
		tags: ['linked', 'rattling', 'complete'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 243,
		displayName: 'Iron Greaves',
		type: 'leggings',
		material: 'ironplate',
		description: 'Solid iron leg plates that reduce mobility noticeably in exchange for serious protection.',
		tags: ['forged', 'heavy', 'restricting'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 247,
		displayName: 'Obsidian Greaves',
		type: 'leggings',
		material: 'obsidian',
		description: 'Obsidian plates down the legs. Effortlessly deflects blades, dangerously weak against bludgeons.',
		tags: ['volcanic', 'sharp', 'polarizing'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 251,
		displayName: 'Kevlar Leggings',
		type: 'leggings',
		material: 'kevlar',
		description: 'Synthetic leg armor tuned for agility under live combat conditions.',
		tags: ['synthetic', 'ballistic', 'agile'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 255,
		displayName: 'Crystal Greaves',
		type: 'leggings',
		material: 'diamondplate',
		description: 'Crystalline leg plates that move with surprising ease given how thoroughly they absorb damage.',
		tags: ['crystalline', 'supreme', 'fluid'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
] as const;
