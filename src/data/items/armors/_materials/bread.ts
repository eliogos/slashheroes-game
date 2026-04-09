import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const breadMaterial: ArmorMaterialDefinition = {
	id: 'bread',
	displayName: 'Bread',
	description: 'Warm, soft, and tasty. Offers next to no protection but smells incredible.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(8e4) },
		chest: {
			thickness: Length.FromMillimeters(0.5),
			hardness: Pressure.FromPascals(5e4),
		},
		leggings: { elasticity: Pressure.FromPascals(1.05e9) },
		boots: { tractionCoefficient: 0.30 },
	},
	baseWeight: Mass.FromKilograms(0.20),
	variance: 1.00,
};
