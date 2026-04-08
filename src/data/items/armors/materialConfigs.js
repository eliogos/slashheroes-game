import { DEFAULT_ITEM_WEIGHT_KG, EPSILON } from '../../helpers/constants.js';
import { Length, Mass, Pressure } from 'unitsnet-js';

// `types.helmet.yieldStress`   — helmet-specific yield threshold under concentrated impact pressure.
// `types.chest.thickness`      — fixed plate thickness in millimeters.
// `types.chest.hardness`       — penetration resistance of the chest material.
// `types.leggings.elasticity`      — effective flex rigidity / Young's-modulus-style stiffness in Pascals; lower = easier flex = better agility/evasion.
// `types.boots.tractionCoefficient` — coefficient of friction (μ), unitless grip against the ground.
// `baseWeight`                    — root material mass in kilograms; armor items can derive their weight from this.
// `variance`                      — 0 (consistent) → 1 (wildly inconsistent). Spread around the base stat value.

function defineLazyDefault(target, prop, warningMessage, createDefault) {
	let warned = false;

	Object.defineProperty(target, prop, {
		enumerable: true,
		configurable: true,
		get() {
			if (!warned) {
				console.warn(warningMessage);
				warned = true;
			}
			return createDefault();
		},
		set(value) {
			Object.defineProperty(this, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true,
			});
		},
	});
}

class Helmet {
	constructor() {
		defineLazyDefault(
			this,
			'yieldStress',
			"[Helmet] 'yieldStress' was never set — defaulting to Pressure.FromPascals(EPSILON)",
			() => Pressure.FromPascals(EPSILON)
		);
	}

	setYieldStress(value) {
		this.yieldStress = value;
		return this;
	}
}

class Chest {
	constructor() {
		defineLazyDefault(
			this,
			'thickness',
			"[Chest] 'thickness' was never set — defaulting to Length.FromMillimeters(EPSILON)",
			() => Length.FromMillimeters(EPSILON)
		);
		defineLazyDefault(
			this,
			'hardness',
			"[Chest] 'hardness' was never set — defaulting to Pressure.FromPascals(EPSILON)",
			() => Pressure.FromPascals(EPSILON)
		);
	}

	setThickness(value) {
		this.thickness = value;
		return this;
	}

	setHardness(value) {
		this.hardness = value;
		return this;
	}
}

class Leggings {
	constructor() {
		defineLazyDefault(
			this,
			'elasticity',
			"[Leggings] 'elasticity' was never set — defaulting to Pressure.FromPascals(EPSILON)",
			() => Pressure.FromPascals(EPSILON)
		);
	}

	setElasticity(value) {
		this.elasticity = value;
		return this;
	}

	setElasticityModulus(value) {
		return this.setElasticity(value);
	}
}

class Boots {
	constructor() {
		defineLazyDefault(
			this,
			'tractionCoefficient',
			"[Boots] 'tractionCoefficient' was never set — defaulting to EPSILON",
			() => EPSILON
		);
	}

	setTractionCoefficient(value) {
		this.tractionCoefficient = value;
		return this;
	}

	setTraction(value) {
		return this.setTractionCoefficient(value);
	}
}

const STAT_PROPS = ['variance'];

class ArmorMaterial {
	constructor(id) {
		this.id = id;
		this.displayName = id;
		this.description = '';
		this.types = {
			helmet: new Helmet(),
			chest: new Chest(),
			leggings: new Leggings(),
			boots: new Boots(),
		};

		defineLazyDefault(
			this,
			'baseWeight',
			`[ArmorMaterial '${id}'] 'baseWeight' was never set — defaulting to Mass.FromKilograms(EPSILON)`,
			() => Mass.FromKilograms(EPSILON)
		);

		for (const prop of STAT_PROPS) {
			defineLazyDefault(
				this,
				prop,
				`[ArmorMaterial '${id}'] '${prop}' was never set — defaulting to EPSILON`,
				() => EPSILON
			);
		}
	}

	get helmet() {
		return this.types.helmet;
	}

	get chest() {
		return this.types.chest;
	}

	get leggings() {
		return this.types.leggings;
	}

	get boots() {
		return this.types.boots;
	}

	get rigidity() {
		return this.types.leggings.elasticity;
	}

	get traction() {
		return this.types.boots.tractionCoefficient;
	}

	get weight() {
		return this.baseWeight;
	}

	get weightFactor() {
		const weightKg = this.baseWeight?.Kilograms ?? EPSILON;
		return Math.min(Math.max(weightKg / DEFAULT_ITEM_WEIGHT_KG, EPSILON), 1);
	}

	setDisplayName(value) { this.displayName = value; return this; }
	setDescription(value) { this.description = value; return this; }

	setTypes(...types) {
		for (const type of types) {
			if (type instanceof Helmet) this.types.helmet = type;
			if (type instanceof Chest) this.types.chest = type;
			if (type instanceof Leggings) this.types.leggings = type;
			if (type instanceof Boots) this.types.boots = type;
		}
		return this;
	}

	setElasticity(value) { this.types.leggings.setElasticity(value); return this; }
	setRigidity(value) { return this.setElasticity(value); }
	setTraction(value) { this.types.boots.setTraction(value); return this; }
	setTractionCoefficient(value) { this.types.boots.setTractionCoefficient(value); return this; }
	setBaseWeight(value) { this.baseWeight = value; return this; }
	setWeight(value) { return this.setBaseWeight(value); }
	setWeightFactor(value) { return this.setBaseWeight(Mass.FromKilograms(value * DEFAULT_ITEM_WEIGHT_KG)); }
	setVariance(value) { this.variance = value; return this; }
}

// Sorted weakest → strongest (by chest hardness)
const materialEntries = [
	new ArmorMaterial('paper')
		.setDisplayName('Paper')
		.setDescription('Thin sheets that offer the comfort of believing you are protected.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(1.5e5)),

			new Chest()
				.setThickness(Length.FromMillimeters(0.2))
				.setHardness(Pressure.FromPascals(2e4)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.11e9)),
				// Also uses Weight

			new Boots()
				.setTractionCoefficient(0.10)
				// Will soon also use Interaction from Terrain
		)
		.setBaseWeight(Mass.FromKilograms(0.10))
		.setVariance(1.00),

	new ArmorMaterial('bread')
		.setDisplayName('Bread')
		.setDescription('Warm, soft, and tasty. Offers next to no protection but smells incredible.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(8e4)),

			new Chest()
				.setThickness(Length.FromMillimeters(0.5))
				.setHardness(Pressure.FromPascals(5e4)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.05e9)),

			new Boots()
				.setTractionCoefficient(0.30)
		)
		.setBaseWeight(Mass.FromKilograms(0.20))
		.setVariance(1.00),

	new ArmorMaterial('cardboard')
		.setDisplayName('Cardboard')
		.setDescription('Corrugated layers that absorb minor shock before collapsing.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(4e5)),

			new Chest()
				.setThickness(Length.FromMillimeters(1.5))
				.setHardness(Pressure.FromPascals(8e4)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.43e9)),

			new Boots()
				.setTractionCoefficient(0.20)
		)
		.setBaseWeight(Mass.FromKilograms(0.30))
		.setVariance(0.90),

	new ArmorMaterial('fabric')
		.setDisplayName('Fabric')
		.setDescription('Woven cloth padding that diffuses light blows and offers basic coverage.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(8e6)),

			new Chest()
				.setThickness(Length.FromMillimeters(2))
				.setHardness(Pressure.FromPascals(1.4e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.18e9)),

			new Boots()
				.setTractionCoefficient(0.50)
		)
		.setBaseWeight(Mass.FromKilograms(0.50))
		.setVariance(0.70),

	new ArmorMaterial('seashells')
		.setDisplayName('Seashells')
		.setDescription('Coastal material that splinters under hard hits but looks the part.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(1.2e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(3))
				.setHardness(Pressure.FromPascals(2e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.0e10)),

			new Boots()
				.setTractionCoefficient(0.30)
		)
		.setBaseWeight(Mass.FromKilograms(1.50))
		.setVariance(0.80),

	new ArmorMaterial('bone')
		.setDisplayName('Bone')
		.setDescription('Dried animal bones lashed into protective pieces. Grim and surprisingly functional.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(1.8e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(4))
				.setHardness(Pressure.FromPascals(2.8e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(6.67e9)),

			new Boots()
				.setTractionCoefficient(0.40)
		)
		.setBaseWeight(Mass.FromKilograms(2.00))
		.setVariance(0.65),

	new ArmorMaterial('leather')
		.setDisplayName('Leather')
		.setDescription('Tanned hide hardened for combat. The reliable baseline for practical protection.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(2.2e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(3.5))
				.setHardness(Pressure.FromPascals(3.8e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.67e9)),

			new Boots()
				.setTractionCoefficient(0.70)
		)
		.setBaseWeight(Mass.FromKilograms(2.50))
		.setVariance(0.50),

	new ArmorMaterial('wood')
		.setDisplayName('Wood')
		.setDescription('Carved and treated timber that holds against blades and distributes blunt force.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(1.4e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(5))
				.setHardness(Pressure.FromPascals(4.6e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(5.0e9)),

			new Boots()
				.setTractionCoefficient(0.50)
		)
		.setBaseWeight(Mass.FromKilograms(3.00))
		.setVariance(0.50),

	new ArmorMaterial('scales')
		.setDisplayName('Scales')
		.setDescription('Overlapping reptile scales that redirect strikes and resist minor punctures.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(2.6e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(2.5))
				.setHardness(Pressure.FromPascals(5.5e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(2.0e9)),

			new Boots()
				.setTractionCoefficient(0.60)
		)
		.setBaseWeight(Mass.FromKilograms(3.50))
		.setVariance(0.40),

	new ArmorMaterial('chainmail')
		.setDisplayName('Chainmail')
		.setDescription('Interlocked metal rings that distribute impact force and shrug off cutting edges.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(1.6e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(6))
				.setHardness(Pressure.FromPascals(6.5e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.33e9)),

			new Boots()
				.setTractionCoefficient(0.40)
		)
		.setBaseWeight(Mass.FromKilograms(5.50))
		.setVariance(0.30),

	new ArmorMaterial('ironplate')
		.setDisplayName('Ironplate')
		.setDescription('Thick forged iron that absorbs heavy strikes at the cost of mobility.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(3.5e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(8))
				.setHardness(Pressure.FromPascals(7.5e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(5.0e9)),

			new Boots()
				.setTractionCoefficient(0.50)
		)
		.setBaseWeight(Mass.FromKilograms(7.50))
		.setVariance(0.25),

	new ArmorMaterial('obsidian')
		.setDisplayName('Obsidian')
		.setDescription('Volcanic glass ground into plates. Extremely hard but brittle under bludgeoning.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(9e6)),

			new Chest()
				.setThickness(Length.FromMillimeters(3))
				.setHardness(Pressure.FromPascals(8.3e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(2.0e10)),

			new Boots()
				.setTractionCoefficient(0.20)
		)
		.setBaseWeight(Mass.FromKilograms(7.00))
		.setVariance(0.35),

	new ArmorMaterial('kevlar')
		.setDisplayName('Kevlar')
		.setDescription('Synthetic high-tensile fiber rated for ballistic and combat impacts.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(5e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(4))
				.setHardness(Pressure.FromPascals(9.1e5)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(1.43e9)),

			new Boots()
				.setTractionCoefficient(0.75)
		)
		.setBaseWeight(Mass.FromKilograms(4.00))
		.setVariance(0.15),

	new ArmorMaterial('diamondplate')
		.setDisplayName('Diamondplate')
		.setDescription('The hardest material worked into armor. Sets the ceiling for what protection can mean.')
		.setTypes(
			new Helmet()
				.setYieldStress(Pressure.FromPascals(6e7)),

			new Chest()
				.setThickness(Length.FromMillimeters(10))
				.setHardness(Pressure.FromPascals(1e6)),

			new Leggings()
				.setElasticity(Pressure.FromPascals(3.33e9)),

			new Boots()
				.setTractionCoefficient(0.90)
		)
		.setBaseWeight(Mass.FromKilograms(8.50))
		.setVariance(0.00),
];

export const materialConfigs = Object.freeze(
	Object.fromEntries(materialEntries.map(entry => [entry.id, entry]))
);

export const materialIds = Object.freeze(materialEntries.map(entry => entry.id));

