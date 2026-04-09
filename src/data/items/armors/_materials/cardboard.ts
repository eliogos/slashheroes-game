import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const cardboardMaterial: ArmorMaterialDefinition = {
	id: 'cardboard',
	displayName: 'Cardboard',
	description: 'Corrugated layers that absorb minor shock before collapsing.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(4e5) },
		chest: {
			thickness: Length.FromMillimeters(1.5),
			hardness: Pressure.FromPascals(8e4),
		},
		leggings: { elasticity: Pressure.FromPascals(1.43e9) },
		boots: { tractionCoefficient: 0.20 },
	},
	baseWeight: Mass.FromKilograms(0.30),
	variance: 0.90,
};
