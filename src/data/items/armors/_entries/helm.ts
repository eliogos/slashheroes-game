import { defineArmor } from '../helpers/index.js';

export const helmArmors = [
	defineArmor({
		internalId: 201,
		displayName: 'Paper Hat',
		type: 'helm',
		material: 'paper',
		description: 'A paper hat you have convinced yourself counts as armor. It does not.',
		tags: ['papery', 'flimsy', 'unconvincing'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 205,
		displayName: 'Brioche Cap',
		type: 'helm',
		material: 'bread',
		description: 'A hollow loaf balanced on the head. The crumbs offer no protection but the smell is oddly calming.',
		tags: ['edible', 'crumbly', 'comforting'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 209,
		displayName: 'Carton Cap',
		type: 'helm',
		material: 'cardboard',
		description: 'A cardboard box trimmed into a helm shape. It held once, against a light drizzle.',
		tags: ['corrugated', 'makeshift', 'optimistic'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 213,
		displayName: 'Cloth Hood',
		type: 'helm',
		material: 'fabric',
		description: 'A padded cloth hood that takes the edge off glancing blows and keeps the ears warm.',
		tags: ['woven', 'soft', 'humble'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 217,
		displayName: 'Shell Crown',
		type: 'helm',
		material: 'seashells',
		description: 'Shells lashed over the skull. Looks coastal, cracks under anything deliberate.',
		tags: ['coastal', 'brittle', 'decorative'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 221,
		displayName: 'Skull',
		type: 'helm',
		material: 'bone',
		description: 'Just a skull strapped to the head. Whose skull is unclear. Does the job regardless.',
		tags: ['skeletal', 'grim', 'functional'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 225,
		displayName: 'Leather Cap',
		type: 'helm',
		material: 'leather',
		description: 'A hardened leather cap that takes a hit without splitting. Dependable starter gear.',
		tags: ['tanned', 'reliable', 'sturdy'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 229,
		displayName: 'Bark Helm',
		type: 'helm',
		material: 'wood',
		description: 'A carved wooden cap that deflects glancing blows and smells faintly of pine.',
		tags: ['carved', 'natural', 'sturdy'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 233,
		displayName: 'Scale Coif',
		type: 'helm',
		material: 'scales',
		description: 'Overlapping reptile scales formed into a cap. Deflects blade tips and distributes smaller impacts.',
		tags: ['reptilian', 'layered', 'flexible'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 237,
		displayName: 'Chainmail Coif',
		type: 'helm',
		material: 'chainmail',
		description: 'A coif of interlocked rings that spreads impact force and resists most cutting edges.',
		tags: ['linked', 'rattling', 'thorough'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 241,
		displayName: 'Iron Helm',
		type: 'helm',
		material: 'ironplate',
		description: 'A forged iron helmet that turns serious hits into dull thuds and requires a strong neck to wear.',
		tags: ['forged', 'heavy', 'decisive'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 245,
		displayName: 'Void Helm',
		type: 'helm',
		material: 'obsidian',
		description: 'Volcanic glass plates worked into a helm. Extremely hard against blades, fragile under heavy blunt force.',
		tags: ['volcanic', 'sharp', 'brittle'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 249,
		displayName: 'Kevlar Helmet',
		type: 'helm',
		material: 'kevlar',
		description: 'A synthetic combat helmet engineered for ballistic and impact resistance in modern engagements.',
		tags: ['synthetic', 'ballistic', 'modern'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
	
	defineArmor({
		internalId: 253,
		displayName: 'Crystal Crown',
		type: 'helm',
		material: 'diamondplate',
		description: 'A crystalline helm that distributes incoming force so completely the wearer barely registers a hit.',
		tags: ['crystalline', 'supreme', 'absolute'],
		created_at: '2026-03-28T00:00:00.000Z',
	}),
] as const;
