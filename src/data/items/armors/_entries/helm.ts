import { defineArmor } from '../helpers/index.js';

export const helmArmors = [
	defineArmor({
		internalId: 201,
		type: 'helm',
		material: 'paper',
		display: {
			en: {
				name: 'Paper Hat',
				description: 'A paper hat you have convinced yourself counts as armor. It does not.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 205,
		type: 'helm',
		material: 'bread',
		display: {
			en: {
				name: 'Brioche Cap',
				description: 'A hollow loaf balanced on the head. The crumbs offer no protection but the smell is oddly calming.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 209,
		type: 'helm',
		material: 'cardboard',
		display: {
			en: {
				name: 'Carton Cap',
				description: 'A cardboard box trimmed into a helm shape. It held once, against a light drizzle.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 213,
		type: 'helm',
		material: 'fabric',
		display: {
			en: {
				name: 'Cloth Hood',
				description: 'A padded cloth hood that takes the edge off glancing blows and keeps the ears warm.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 217,
		type: 'helm',
		material: 'seashells',
		display: {
			en: {
				name: 'Shell Crown',
				description: 'Shells lashed over the skull. Looks coastal, cracks under anything deliberate.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 221,
		type: 'helm',
		material: 'bone',
		display: {
			en: {
				name: 'Skull',
				description: 'Just a skull strapped to the head. Whose skull is unclear. Does the job regardless.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 225,
		type: 'helm',
		material: 'leather',
		display: {
			en: {
				name: 'Leather Cap',
				description: 'A hardened leather cap that takes a hit without splitting. Dependable starter gear.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 229,
		type: 'helm',
		material: 'wood',
		display: {
			en: {
				name: 'Bark Helm',
				description: 'A carved wooden cap that deflects glancing blows and smells faintly of pine.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 233,
		type: 'helm',
		material: 'scales',
		display: {
			en: {
				name: 'Scale Coif',
				description: 'Overlapping reptile scales formed into a cap. Deflects blade tips and distributes smaller impacts.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 237,
		type: 'helm',
		material: 'chainmail',
		display: {
			en: {
				name: 'Chainmail Coif',
				description: 'A coif of interlocked rings that spreads impact force and resists most cutting edges.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 241,
		type: 'helm',
		material: 'ironplate',
		display: {
			en: {
				name: 'Iron Helm',
				description: 'A forged iron helmet that turns serious hits into dull thuds and requires a strong neck to wear.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 245,
		type: 'helm',
		material: 'obsidian',
		display: {
			en: {
				name: 'Void Helm',
				description: 'Volcanic glass plates worked into a helm. Extremely hard against blades, fragile under heavy blunt force.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 249,
		type: 'helm',
		material: 'kevlar',
		display: {
			en: {
				name: 'Kevlar Helmet',
				description: 'A synthetic combat helmet engineered for ballistic and impact resistance in modern engagements.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),

	defineArmor({
		internalId: 253,
		type: 'helm',
		material: 'diamondplate',
		display: {
			en: {
				name: 'Crystal Crown',
				description: 'A crystalline helm that distributes incoming force so completely the wearer barely registers a hit.',
			},
		},
		created_at: '2026-03-28T00:00:00.000Z',
	}),
] as const;
