import { Armor, ARMOR_TYPE } from '../Armor.js';
const { CHEST } = ARMOR_TYPE;

export const chestArmors = [
	new Armor('paper_chest')
		.setInternalId(202)
		.setDisplayName("Paper Polo")
		.setType(CHEST)
		.setMaterial('paper')
		.setDescription("A paper polo shirt that passes the visual inspection and fails every other kind.")
		.setTags('papery', 'flimsy', 'pointless')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bread_chest')
		.setInternalId(206)
		.setDisplayName("Breadplate")
		.setType(CHEST)
		.setMaterial('bread')
		.setDescription("A bread breastplate that softens in rain, hardens in sun, and helps nobody.")
		.setTags('edible', 'crumbly', 'impractical')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('cardboard_chest')
		.setInternalId(210)
		.setDisplayName("Cardboard Cuirass")
		.setType(CHEST)
		.setMaterial('cardboard')
		.setDescription("Layers of corrugated cardboard shaped into a vest. Survives light contact and nothing deliberate.")
		.setTags('corrugated', 'makeshift', 'layered')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('fabric_chest')
		.setInternalId(214)
		.setDisplayName("Quilted Vest")
		.setType(CHEST)
		.setMaterial('fabric')
		.setDescription("A quilted cloth vest that diffuses weak strikes across its padding.")
		.setTags('woven', 'soft', 'padded')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('seashells_chest')
		.setInternalId(218)
		.setDisplayName("Shell Coat")
		.setType(CHEST)
		.setMaterial('seashells')
		.setDescription("A shell-covered vest that rattles as you walk and shatters if hit hard enough.")
		.setTags('coastal', 'brittle', 'rattling')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('bone_chest')
		.setInternalId(222)
		.setDisplayName("Ribcage Plate")
		.setType(CHEST)
		.setMaterial('bone')
		.setDescription("Rib bones and vertebrae arranged into a chest piece. The gaps are a problem, the plates are not.")
		.setTags('skeletal', 'grim', 'gapped')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('leather_chest')
		.setInternalId(226)
		.setDisplayName("Leather Chest")
		.setType(CHEST)
		.setMaterial('leather')
		.setDescription("A hardened leather cuirass that shrugs off glancing hits without weighing you down.")
		.setTags('tanned', 'reliable', 'fitted')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('wood_chest')
		.setInternalId(230)
		.setDisplayName("Timberplate")
		.setType(CHEST)
		.setMaterial('wood')
		.setDescription("Treated timber plates strapped to the torso. Heavier than leather but meaningfully tougher.")
		.setTags('carved', 'natural', 'planked')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('scales_chest')
		.setInternalId(234)
		.setDisplayName("Scale Coat")
		.setType(CHEST)
		.setMaterial('scales')
		.setDescription("A coat of overlapping reptile scales that redirects strikes and resists minor punctures.")
		.setTags('reptilian', 'layered', 'redirecting')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('chainmail_chest')
		.setInternalId(238)
		.setDisplayName("Chainmail Hauberk")
		.setType(CHEST)
		.setMaterial('chainmail')
		.setDescription("Interlocked metal rings that distribute strike force across the entire torso.")
		.setTags('linked', 'rattling', 'distributed')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('ironplate_chest')
		.setInternalId(242)
		.setDisplayName("Iron Cuirass")
		.setType(CHEST)
		.setMaterial('ironplate')
		.setDescription("Thick forged iron that eats damage at the cost of breathing freely during a sprint.")
		.setTags('forged', 'heavy', 'absorbing')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('obsidian_chest')
		.setInternalId(246)
		.setDisplayName("Obsidian Breastplate")
		.setType(CHEST)
		.setMaterial('obsidian')
		.setDescription("Black glass plates layered over the chest. Annihilates cutting edges, shatters against hammers.")
		.setTags('volcanic', 'sharp', 'polarizing')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('kevlar_chest')
		.setInternalId(250)
		.setDisplayName("Kevlar Vest")
		.setType(CHEST)
		.setMaterial('kevlar')
		.setDescription("A ballistic-rated vest that handles modern threats with more confidence than most forged steel.")
		.setTags('synthetic', 'ballistic', 'rated')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),

	new Armor('diamondplate_chest')
		.setInternalId(254)
		.setDisplayName("Diamond Breastplate")
		.setType(CHEST)
		.setMaterial('diamondplate')
		.setDescription("A full chest piece of crystalline plate that defines the upper ceiling of what protection can mean.")
		.setTags('crystalline', 'supreme', 'definitive')
		.setCreatedAt('2026-03-28T00:00:00.000Z'),
];
