// malleability   — 0 (rigid/brittle) → 1 (highly flexible/deformable). Drives helm crit mitigation and leggings evasion.
// hardness       — 0 (very soft) → 1 (extremely hard). Drives chest defense.
// traction       — 0 (slippery) → 1 (high grip). Drives boots friction (stamina cost).
// weightFactor   — 0 (negligible mass) → 1 (very dense/heavy). Penalises leggings evasion and boots friction.
// variance       — 0 (consistent) → 1 (wildly inconsistent). Spread around base stat value.
const STAT_PROPS = ['malleability', 'hardness', 'traction', 'weightFactor', 'variance'];

class Material {
	constructor(id) {
		this.id = id;
		this.displayName = id;
		this.description = '';

		for (const prop of STAT_PROPS) {
			let warned = false;
			Object.defineProperty(this, prop, {
				enumerable: true,
				configurable: true,
				get() {
					if (!warned) {
						console.warn(`[Material '${id}'] '${prop}' was never set — defaulting to 0`);
						warned = true;
					}
					return 0;
				},
				set(value) {
					Object.defineProperty(this, prop, { value, writable: true, enumerable: true, configurable: true });
				},
			});
		}
	}

	setDisplayName(value)  { this.displayName  = value; return this; }
	setDescription(value)  { this.description  = value; return this; }
	setMalleability(value) { this.malleability = value; return this; }
	setHardness(value)     { this.hardness     = value; return this; }
	setTraction(value)     { this.traction     = value; return this; }
	setWeightFactor(value) { this.weightFactor = value; return this; }
	setVariance(value)     { this.variance     = value; return this; }
}

// Sorted weakest → strongest (by hardness)
const materialEntries = [
	new Material('paper')
		.setDisplayName('Paper')
		.setDescription('Thin sheets that offer the comfort of believing you are protected.')
		.setMalleability(0.90).setHardness(0.02).setTraction(0.10).setWeightFactor(0.01).setVariance(1.00),
	new Material('bread')
		.setDisplayName('Bread')
		.setDescription('Warm, soft, and tasty. Offers next to no protection but smells incredible.')
		.setMalleability(0.95).setHardness(0.05).setTraction(0.30).setWeightFactor(0.02).setVariance(1.00),
	new Material('cardboard')
		.setDisplayName('Cardboard')
		.setDescription('Corrugated layers that absorb minor shock before collapsing.')
		.setMalleability(0.70).setHardness(0.08).setTraction(0.20).setWeightFactor(0.03).setVariance(0.90),
	new Material('fabric')
		.setDisplayName('Fabric')
		.setDescription('Woven cloth padding that diffuses light blows and offers basic coverage.')
		.setMalleability(0.85).setHardness(0.14).setTraction(0.50).setWeightFactor(0.05).setVariance(0.70),
	new Material('seashells')
		.setDisplayName('Seashells')
		.setDescription('Coastal material that splinters under hard hits but looks the part.')
		.setMalleability(0.10).setHardness(0.20).setTraction(0.30).setWeightFactor(0.15).setVariance(0.80),
	new Material('bone')
		.setDisplayName('Bone')
		.setDescription('Dried animal bones lashed into protective pieces. Grim and surprisingly functional.')
		.setMalleability(0.15).setHardness(0.28).setTraction(0.40).setWeightFactor(0.20).setVariance(0.65),
	new Material('leather')
		.setDisplayName('Leather')
		.setDescription('Tanned hide hardened for combat. The reliable baseline for practical protection.')
		.setMalleability(0.60).setHardness(0.38).setTraction(0.70).setWeightFactor(0.25).setVariance(0.50),
	new Material('wood')
		.setDisplayName('Wood')
		.setDescription('Carved and treated timber that holds against blades and distributes blunt force.')
		.setMalleability(0.20).setHardness(0.46).setTraction(0.50).setWeightFactor(0.30).setVariance(0.50),
	new Material('scales')
		.setDisplayName('Scales')
		.setDescription('Overlapping reptile scales that redirect strikes and resist minor punctures.')
		.setMalleability(0.50).setHardness(0.55).setTraction(0.60).setWeightFactor(0.35).setVariance(0.40),
	new Material('chainmail')
		.setDisplayName('Chainmail')
		.setDescription('Interlocked metal rings that distribute impact force and shrug off cutting edges.')
		.setMalleability(0.75).setHardness(0.65).setTraction(0.40).setWeightFactor(0.55).setVariance(0.30),
	new Material('ironplate')
		.setDisplayName('Ironplate')
		.setDescription('Thick forged iron that absorbs heavy strikes at the cost of mobility.')
		.setMalleability(0.20).setHardness(0.75).setTraction(0.50).setWeightFactor(0.75).setVariance(0.25),
	new Material('obsidian')
		.setDisplayName('Obsidian')
		.setDescription('Volcanic glass ground into plates. Extremely hard but brittle under bludgeoning.')
		.setMalleability(0.05).setHardness(0.83).setTraction(0.20).setWeightFactor(0.70).setVariance(0.35),
	new Material('kevlar')
		.setDisplayName('Kevlar')
		.setDescription('Synthetic high-tensile fiber rated for ballistic and combat impacts.')
		.setMalleability(0.70).setHardness(0.91).setTraction(0.75).setWeightFactor(0.40).setVariance(0.15),
	new Material('diamondplate')
		.setDisplayName('Diamondplate')
		.setDescription('The hardest material worked into armor. Sets the ceiling for what protection can mean.')
		.setMalleability(0.30).setHardness(1.00).setTraction(0.90).setWeightFactor(0.85).setVariance(0.00),
];

export const materialConfigs = Object.freeze(
	Object.fromEntries(materialEntries.map(entry => [entry.id, entry]))
);
export const materialIds = Object.freeze(materialEntries.map(entry => entry.id));
