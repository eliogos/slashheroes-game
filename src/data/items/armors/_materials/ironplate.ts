import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const ironplateMaterial: ArmorMaterialDefinition = {
	id: 'ironplate',
	displayName: 'Ironplate',
	description: 'Thick forged iron that absorbs heavy strikes at the cost of mobility.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(3.5e7) },
		chest: {
			thickness: Length.FromMillimeters(8),
			hardness: Pressure.FromPascals(7.5e5),
		},
		leggings: { elasticity: Pressure.FromPascals(5.0e9) },
		boots: { tractionCoefficient: 0.50 },
	},
	baseWeight: Mass.FromKilograms(7.50),
	variance: 0.25,
};
