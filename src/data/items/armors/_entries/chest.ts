import { defineArmor } from '../helpers/index.js';

export const chestArmors = [
	defineArmor({
		internalId: 202,
		type: 'chest',
		material: 'paper',
		display: {
			en: {
				name: 'Paper Polo',
				description: 'A paper polo shirt that passes the visual inspection and fails every other kind.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 206,
		type: 'chest',
		material: 'bread',
		display: {
			en: {
				name: 'Breadplate',
				description: 'A bread breastplate that softens in rain, hardens in sun, and helps nobody.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 210,
		type: 'chest',
		material: 'cardboard',
		display: {
			en: {
				name: 'Cardboard Cuirass',
				description: 'Layers of corrugated cardboard shaped into a vest. Survives light contact and nothing deliberate.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 214,
		type: 'chest',
		material: 'fabric',
		display: {
			en: {
				name: 'Quilted Vest',
				description: 'A quilted cloth vest that diffuses weak strikes across its padding.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 218,
		type: 'chest',
		material: 'seashells',
		display: {
			en: {
				name: 'Shell Coat',
				description: 'A shell-covered vest that rattles as you walk and shatters if hit hard enough.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 222,
		type: 'chest',
		material: 'bone',
		display: {
			en: {
				name: 'Ribcage Plate',
				description: 'Rib bones and vertebrae arranged into a chest piece. The gaps are a problem, the plates are not.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 226,
		type: 'chest',
		material: 'leather',
		display: {
			en: {
				name: 'Leather Chest',
				description: 'A hardened leather cuirass that shrugs off glancing hits without weighing you down.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 230,
		type: 'chest',
		material: 'wood',
		display: {
			en: {
				name: 'Timberplate',
				description: 'Treated timber plates strapped to the torso. Heavier than leather but meaningfully tougher.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 234,
		type: 'chest',
		material: 'scales',
		display: {
			en: {
				name: 'Scale Coat',
				description: 'A coat of overlapping reptile scales that redirects strikes and resists minor punctures.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 238,
		type: 'chest',
		material: 'chainmail',
		display: {
			en: {
				name: 'Chainmail Hauberk',
				description: 'Interlocked metal rings that distribute strike force across the entire torso.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 242,
		type: 'chest',
		material: 'ironplate',
		display: {
			en: {
				name: 'Iron Cuirass',
				description: 'Thick forged iron that eats damage at the cost of breathing freely during a sprint.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 246,
		type: 'chest',
		material: 'obsidian',
		display: {
			en: {
				name: 'Obsidian Breastplate',
				description: 'Black glass plates layered over the chest. Annihilates cutting edges, shatters against hammers.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 250,
		type: 'chest',
		material: 'kevlar',
		display: {
			en: {
				name: 'Kevlar Vest',
				description: 'A ballistic-rated vest that handles modern threats with more confidence than most forged steel.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 254,
		type: 'chest',
		material: 'diamondplate',
		display: {
			en: {
				name: 'Diamond Breastplate',
				description: 'A full chest piece of crystalline plate that defines the upper ceiling of what protection can mean.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),
] as const;
