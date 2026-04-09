import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const boneMaterial: ArmorMaterialDefinition = {
	id: 'bone',
	displayName: 'Bone',
	description: 'Dried animal bones lashed into protective pieces. Grim and surprisingly functional.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(1.8e7) },
		chest: {
			thickness: Length.FromMillimeters(4),
			hardness: Pressure.FromPascals(2.8e5),
		},
		leggings: { elasticity: Pressure.FromPascals(6.67e9) },
		boots: { tractionCoefficient: 0.40 },
	},
	baseWeight: Mass.FromKilograms(2.00),
	variance: 0.65,
};
