import { Length, Mass, Pressure } from 'unitsnet-js';
import type { ArmorMaterialDefinition } from '../types.ts';

export const obsidianMaterial: ArmorMaterialDefinition = {
	id: 'obsidian',
	displayName: 'Obsidian',
	description: 'Volcanic glass ground into plates. Extremely hard but brittle under bludgeoning.',
	types: {
		helm: { yieldStress: Pressure.FromPascals(9e6) },
		chest: {
			thickness: Length.FromMillimeters(3),
			hardness: Pressure.FromPascals(8.3e5),
		},
		leggings: { elasticity: Pressure.FromPascals(2.0e10) },
		boots: { tractionCoefficient: 0.20 },
	},
	baseWeight: Mass.FromKilograms(7.00),
	variance: 0.35,
};
