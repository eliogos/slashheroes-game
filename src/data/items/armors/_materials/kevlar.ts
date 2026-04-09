import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const kevlarMaterial: ArmorMaterialDefinition = {
	id: 'kevlar',
	displayName: 'Kevlar',
	description: 'Synthetic high-tensile fiber rated for ballistic and combat impacts.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(5e7) },
		chest: {
			thickness: Length.FromMillimeters(4),
			hardness: Pressure.FromPascals(9.1e5),
		},
		leggings: { elasticity: Pressure.FromPascals(1.43e9) },
		boots: { tractionCoefficient: 0.75 },
	},
	baseWeight: Mass.FromKilograms(4.00),
	variance: 0.15,
};
