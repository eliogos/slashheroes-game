import { Armor, ARMOR_TYPE } from '../Armor.js';
const { HELM } = ARMOR_TYPE;

export const helmArmors = [
	new Armor('paper_helm')
		.setInternalId(201)
		.setDisplayName("Paper Hat")
		.setType(HELM)
		.setMaterial('paper')
		.setDescription("A paper hat you have convinced yourself counts as armor. It does not.")
		.setTags('papery', 'flimsy', 'unconvincing')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bread_helm')
		.setInternalId(205)
		.setDisplayName("Brioche Cap")
		.setType(HELM)
		.setMaterial('bread')
		.setDescription("A hollow loaf balanced on the head. The crumbs offer no protection but the smell is oddly calming.")
		.setTags('edible', 'crumbly', 'comforting')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('cardboard_helm')
		.setInternalId(209)
		.setDisplayName("Carton Cap")
		.setType(HELM)
		.setMaterial('cardboard')
		.setDescription("A cardboard box trimmed into a helm shape. It held once, against a light drizzle.")
		.setTags('corrugated', 'makeshift', 'optimistic')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('fabric_helm')
		.setInternalId(213)
		.setDisplayName("Cloth Hood")
		.setType(HELM)
		.setMaterial('fabric')
		.setDescription("A padded cloth hood that takes the edge off glancing blows and keeps the ears warm.")
		.setTags('woven', 'soft', 'humble')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('seashells_helm')
		.setInternalId(217)
		.setDisplayName("Shell Crown")
		.setType(HELM)
		.setMaterial('seashells')
		.setDescription("Shells lashed over the skull. Looks coastal, cracks under anything deliberate.")
		.setTags('coastal', 'brittle', 'decorative')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bone_helm')
		.setInternalId(221)
		.setDisplayName("Skull")
		.setType(HELM)
		.setMaterial('bone')
		.setDescription("Just a skull strapped to the head. Whose skull is unclear. Does the job regardless.")
		.setTags('skeletal', 'grim', 'functional')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('leather_helm')
		.setInternalId(225)
		.setDisplayName("Leather Cap")
		.setType(HELM)
		.setMaterial('leather')
		.setDescription("A hardened leather cap that takes a hit without splitting. Dependable starter gear.")
		.setTags('tanned', 'reliable', 'sturdy')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('wood_helm')
		.setInternalId(229)
		.setDisplayName("Bark Helm")
		.setType(HELM)
		.setMaterial('wood')
		.setDescription("A carved wooden cap that deflects glancing blows and smells faintly of pine.")
		.setTags('carved', 'natural', 'sturdy')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('scales_helm')
		.setInternalId(233)
		.setDisplayName("Scale Coif")
		.setType(HELM)
		.setMaterial('scales')
		.setDescription("Overlapping reptile scales formed into a cap. Deflects blade tips and distributes smaller impacts.")
		.setTags('reptilian', 'layered', 'flexible')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('chainmail_helm')
		.setInternalId(237)
		.setDisplayName("Chainmail Coif")
		.setType(HELM)
		.setMaterial('chainmail')
		.setDescription("A coif of interlocked rings that spreads impact force and resists most cutting edges.")
		.setTags('linked', 'rattling', 'thorough')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('ironplate_helm')
		.setInternalId(241)
		.setDisplayName("Iron Helm")
		.setType(HELM)
		.setMaterial('ironplate')
		.setDescription("A forged iron helmet that turns serious hits into dull thuds and requires a strong neck to wear.")
		.setTags('forged', 'heavy', 'decisive')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('obsidian_helm')
		.setInternalId(245)
		.setDisplayName("Void Helm")
		.setType(HELM)
		.setMaterial('obsidian')
		.setDescription("Volcanic glass plates worked into a helm. Extremely hard against blades, fragile under heavy blunt force.")
		.setTags('volcanic', 'sharp', 'brittle')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('kevlar_helm')
		.setInternalId(249)
		.setDisplayName("Kevlar Helmet")
		.setType(HELM)
		.setMaterial('kevlar')
		.setDescription("A synthetic combat helmet engineered for ballistic and impact resistance in modern engagements.")
		.setTags('synthetic', 'ballistic', 'modern')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('diamondplate_helm')
		.setInternalId(253)
		.setDisplayName("Crystal Crown")
		.setType(HELM)
		.setMaterial('diamondplate')
		.setDescription("A crystalline helm that distributes incoming force so completely the wearer barely registers a hit.")
		.setTags('crystalline', 'supreme', 'absolute')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),
];
