import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const fabricMaterial: ArmorMaterialDefinition = {
	id: 'fabric',
	displayName: 'Fabric',
	description: 'Woven cloth padding that diffuses light blows and offers basic coverage.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(8e6) },
		chest: {
			thickness: Length.FromMillimeters(2),
			hardness: Pressure.FromPascals(1.4e5),
		},
		leggings: { elasticity: Pressure.FromPascals(1.18e9) },
		boots: { tractionCoefficient: 0.50 },
	},
	baseWeight: Mass.FromKilograms(0.50),
	variance: 0.70,
};
