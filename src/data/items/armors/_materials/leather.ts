import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const leatherMaterial: ArmorMaterialDefinition = {
	id: 'leather',
	displayName: 'Leather',
	description: 'Tanned hide hardened for combat. The reliable baseline for practical protection.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(2.2e7) },
		chest: {
			thickness: Length.FromMillimeters(3.5),
			hardness: Pressure.FromPascals(3.8e5),
		},
		leggings: { elasticity: Pressure.FromPascals(1.67e9) },
		boots: { tractionCoefficient: 0.70 },
	},
	baseWeight: Mass.FromKilograms(2.50),
	variance: 0.50,
};
