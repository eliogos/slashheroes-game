import { defineArmor } from '../helpers/index.js';

export const leggingsArmors = [
	defineArmor({
		internalId: 203,
		type: 'leggings',
		material: 'paper',
		display: {
			en: {
				name: 'Paper Pants',
				description: 'Paper tubes wrapped around the legs. They rustle when you walk and crumple when it matters.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 207,
		type: 'leggings',
		material: 'bread',
		display: {
			en: {
				name: 'Baguette Boxers',
				description: 'Baguettes strapped to the thighs. They snap before the enemy does.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 211,
		type: 'leggings',
		material: 'cardboard',
		display: {
			en: {
				name: 'Box-ers',
				description: 'Cardboard strapped to the legs with tape. The tape is structural.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 215,
		type: 'leggings',
		material: 'fabric',
		display: {
			en: {
				name: 'Padded Leggings',
				description: 'Lightweight padded leggings that offer minimal protection and maximum freedom of movement.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 219,
		type: 'leggings',
		material: 'seashells',
		display: {
			en: {
				name: 'Coral Guards',
				description: 'Shell plates across the knees and shins. Crunchy, scratchy, and marginally protective.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 223,
		type: 'leggings',
		material: 'bone',
		display: {
			en: {
				name: 'Femur Guards',
				description: 'Long bones buckled along the legs. More durable than they look, less than you would hope.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 227,
		type: 'leggings',
		material: 'leather',
		display: {
			en: {
				name: 'Leather Leggings',
				description: 'Hardened leather greaves that protect without slowing the stride.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 231,
		type: 'leggings',
		material: 'wood',
		display: {
			en: {
				name: 'Plank Guards',
				description: 'Wooden shin and thigh plates that hold against most blades but restrict movement noticeably.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 235,
		type: 'leggings',
		material: 'scales',
		display: {
			en: {
				name: 'Scale Chausses',
				description: 'Scaled leg armor that moves with the wearer and sheds strikes across its surface.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 239,
		type: 'leggings',
		material: 'chainmail',
		display: {
			en: {
				name: 'Chainmail Chausses',
				description: 'Linked metal rings covering the legs completely. Heavy but leaving no gaps to exploit.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 243,
		type: 'leggings',
		material: 'ironplate',
		display: {
			en: {
				name: 'Iron Greaves',
				description: 'Solid iron leg plates that reduce mobility noticeably in exchange for serious protection.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 247,
		type: 'leggings',
		material: 'obsidian',
		display: {
			en: {
				name: 'Obsidian Greaves',
				description: 'Obsidian plates down the legs. Effortlessly deflects blades, dangerously weak against bludgeons.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 251,
		type: 'leggings',
		material: 'kevlar',
		display: {
			en: {
				name: 'Kevlar Leggings',
				description: 'Synthetic leg armor tuned for agility under live combat conditions.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 255,
		type: 'leggings',
		material: 'diamondplate',
		display: {
			en: {
				name: 'Crystal Greaves',
				description: 'Crystalline leg plates that move with surprising ease given how thoroughly they absorb damage.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),
] as const;
