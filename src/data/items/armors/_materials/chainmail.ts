import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const chainmailMaterial: ArmorMaterialDefinition = {
	id: 'chainmail',
	displayName: 'Chainmail',
	description: 'Interlocked metal rings that distribute impact force and shrug off cutting edges.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(1.6e7) },
		chest: {
			thickness: Length.FromMillimeters(6),
			hardness: Pressure.FromPascals(6.5e5),
		},
		leggings: { elasticity: Pressure.FromPascals(1.33e9) },
		boots: { tractionCoefficient: 0.40 },
	},
	baseWeight: Mass.FromKilograms(5.50),
	variance: 0.30,
};
