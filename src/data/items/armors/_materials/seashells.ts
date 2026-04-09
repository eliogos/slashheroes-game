import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const seashellsMaterial: ArmorMaterialDefinition = {
	id: 'seashells',
	displayName: 'Seashells',
	description: 'Coastal material that splinters under hard hits but looks the part.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(1.2e7) },
		chest: {
			thickness: Length.FromMillimeters(3),
			hardness: Pressure.FromPascals(2e5),
		},
		leggings: { elasticity: Pressure.FromPascals(1.0e10) },
		boots: { tractionCoefficient: 0.30 },
	},
	baseWeight: Mass.FromKilograms(1.50),
	variance: 0.80,
};
