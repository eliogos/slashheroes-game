import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const paperMaterial: ArmorMaterialDefinition = {
	id: 'paper',
	displayName: 'Paper',
	description: 'Thin sheets that offer the comfort of believing you are protected.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(1.5e5) },
		chest: {
			thickness: Length.FromMillimeters(0.2),
			hardness: Pressure.FromPascals(2e4),
		},
		leggings: { elasticity: Pressure.FromPascals(1.11e9) },
		boots: { tractionCoefficient: 0.10 },
	},
	baseWeight: Mass.FromKilograms(0.10),
	variance: 1.00,
};
