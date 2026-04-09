import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const scalesMaterial: ArmorMaterialDefinition = {
	id: 'scales',
	displayName: 'Scales',
	description: 'Overlapping reptile scales that redirect strikes and resist minor punctures.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(2.6e7) },
		chest: {
			thickness: Length.FromMillimeters(2.5),
			hardness: Pressure.FromPascals(5.5e5),
		},
		leggings: { elasticity: Pressure.FromPascals(2.0e9) },
		boots: { tractionCoefficient: 0.60 },
	},
	baseWeight: Mass.FromKilograms(3.50),
	variance: 0.40,
};
