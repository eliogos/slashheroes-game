import { defineArmor } from '../helpers/index.js';

export const chestArmors = [
	defineArmor({
		internalId: 202,
		displayName: 'Paper Polo',
		type: 'chest',
		material: 'paper',
		description: 'A paper polo shirt that passes the visual inspection and fails every other kind.',
		tags: ['papery', 'flimsy', 'pointless'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 206,
		displayName: 'Breadplate',
		type: 'chest',
		material: 'bread',
		description: 'A bread breastplate that softens in rain, hardens in sun, and helps nobody.',
		tags: ['edible', 'crumbly', 'impractical'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 210,
		displayName: 'Cardboard Cuirass',
		type: 'chest',
		material: 'cardboard',
		description: 'Layers of corrugated cardboard shaped into a vest. Survives light contact and nothing deliberate.',
		tags: ['corrugated', 'makeshift', 'layered'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 214,
		displayName: 'Quilted Vest',
		type: 'chest',
		material: 'fabric',
		description: 'A quilted cloth vest that diffuses weak strikes across its padding.',
		tags: ['woven', 'soft', 'padded'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 218,
		displayName: 'Shell Coat',
		type: 'chest',
		material: 'seashells',
		description: 'A shell-covered vest that rattles as you walk and shatters if hit hard enough.',
		tags: ['coastal', 'brittle', 'rattling'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 222,
		displayName: 'Ribcage Plate',
		type: 'chest',
		material: 'bone',
		description: 'Rib bones and vertebrae arranged into a chest piece. The gaps are a problem, the plates are not.',
		tags: ['skeletal', 'grim', 'gapped'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 226,
		displayName: 'Leather Chest',
		type: 'chest',
		material: 'leather',
		description: 'A hardened leather cuirass that shrugs off glancing hits without weighing you down.',
		tags: ['tanned', 'reliable', 'fitted'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 230,
		displayName: 'Timberplate',
		type: 'chest',
		material: 'wood',
		description: 'Treated timber plates strapped to the torso. Heavier than leather but meaningfully tougher.',
		tags: ['carved', 'natural', 'planked'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 234,
		displayName: 'Scale Coat',
		type: 'chest',
		material: 'scales',
		description: 'A coat of overlapping reptile scales that redirects strikes and resists minor punctures.',
		tags: ['reptilian', 'layered', 'redirecting'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 238,
		displayName: 'Chainmail Hauberk',
		type: 'chest',
		material: 'chainmail',
		description: 'Interlocked metal rings that distribute strike force across the entire torso.',
		tags: ['linked', 'rattling', 'distributed'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 242,
		displayName: 'Iron Cuirass',
		type: 'chest',
		material: 'ironplate',
		description: 'Thick forged iron that eats damage at the cost of breathing freely during a sprint.',
		tags: ['forged', 'heavy', 'absorbing'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 246,
		displayName: 'Obsidian Breastplate',
		type: 'chest',
		material: 'obsidian',
		description: 'Black glass plates layered over the chest. Annihilates cutting edges, shatters against hammers.',
		tags: ['volcanic', 'sharp', 'polarizing'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 250,
		displayName: 'Kevlar Vest',
		type: 'chest',
		material: 'kevlar',
		description: 'A ballistic-rated vest that handles modern threats with more confidence than most forged steel.',
		tags: ['synthetic', 'ballistic', 'rated'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 254,
		displayName: 'Diamond Breastplate',
		type: 'chest',
		material: 'diamondplate',
		description: 'A full chest piece of crystalline plate that defines the upper ceiling of what protection can mean.',
		tags: ['crystalline', 'supreme', 'definitive'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
] as const;
