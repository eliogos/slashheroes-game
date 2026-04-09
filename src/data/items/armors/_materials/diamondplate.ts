import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const diamondplateMaterial: ArmorMaterialDefinition = {
	id: 'diamondplate',
	displayName: 'Diamondplate',
	description: 'The hardest material worked into armor. Sets the ceiling for what protection can mean.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(6e7) },
		chest: {
			thickness: Length.FromMillimeters(10),
			hardness: Pressure.FromPascals(1e6),
		},
		leggings: { elasticity: Pressure.FromPascals(3.33e9) },
		boots: { tractionCoefficient: 0.90 },
	},
	baseWeight: Mass.FromKilograms(8.50),
	variance: 0.00,
};
