// variance: 0–1, how inconsistent the material is (1 = ±100% spread around base)
function defineMaterial(id, displayName, description, baseProtection, variance) {
	return { id, displayName, description, baseProtection, variance };
}

// Sorted weakest → strongest
const materialEntries = [
	defineMaterial('paper',        'Paper',        'Thin sheets that offer the comfort of believing you are protected.',                             2,   1.0),
	defineMaterial('bread',        'Bread',        'Warm, soft, and edible. Offers next to no protection but smells incredible.',                   5,   1.0),
	defineMaterial('cardboard',    'Cardboard',    'Corrugated layers that absorb minor shock before collapsing.',                                  8,   0.9),
	defineMaterial('fabric',       'Fabric',       'Woven cloth padding that diffuses light blows and offers basic coverage.',                     14,   0.7),
	defineMaterial('seashells',    'Seashells',    'Coastal material that splinters under hard hits but looks the part.',                          20,   0.8),
	defineMaterial('bone',         'Bone',         'Dried animal bones lashed into protective pieces. Grim and surprisingly functional.',          28,   0.65),
	defineMaterial('leather',      'Leather',      'Tanned hide hardened for combat. The reliable baseline for practical protection.',             38,   0.5),
	defineMaterial('wood',         'Wood',         'Carved and treated timber that holds against blades and distributes blunt force.',             46,   0.5),
	defineMaterial('scales',       'Scales',       'Overlapping reptile scales that redirect strikes and resist minor punctures.',                 55,   0.4),
	defineMaterial('chainmail',    'Chainmail',    'Interlocked metal rings that distribute impact force and shrug off cutting edges.',            65,   0.3),
	defineMaterial('ironplate',    'Iron Plate',   'Thick forged iron that absorbs heavy strikes at the cost of mobility.',                       75,   0.25),
	defineMaterial('obsidian',     'Obsidian',     'Volcanic glass ground into plates. Extremely hard but brittle under bludgeoning.',            83,   0.35),
	defineMaterial('kevlar',       'Kevlar',       'Synthetic high-tensile fiber rated for ballistic and combat impacts.',                        91,   0.15),
	defineMaterial('diamondplate', 'Diamond Plate','The hardest material worked into armor. Sets the ceiling for what protection can mean.',      100,   0.0),
];

export const materialConfigs = Object.freeze(
	Object.fromEntries(materialEntries.map(entry => [entry.id, entry]))
);
export const materialIds = Object.freeze(materialEntries.map(entry => entry.id));
