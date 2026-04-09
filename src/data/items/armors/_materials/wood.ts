import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const woodMaterial: ArmorMaterialDefinition = {
	id: 'wood',
	displayName: 'Wood',
	description: 'Carved and treated timber that holds against blades and distributes blunt force.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(1.4e7) },
		chest: {
			thickness: Length.FromMillimeters(5),
			hardness: Pressure.FromPascals(4.6e5),
		},
		leggings: { elasticity: Pressure.FromPascals(5.0e9) },
		boots: { tractionCoefficient: 0.50 },
	},
	baseWeight: Mass.FromKilograms(3.00),
	variance: 0.50,
};
