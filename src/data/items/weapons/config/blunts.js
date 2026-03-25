import measurement from 'measurement';
import { normalizeQualities } from '../../../helpers/convertWeaponUnits';

export default {
  id: "FAM_BLUNT",
  variance: { min: 80, max: 120 },
  description: "Blunt weapons may be the slowest but they deal the most painful damage when striking.",
  qualities: normalizeQualities(
		{
			weight: measurement('4 kg'),
			speed: measurement('4.5 m/s'),       
			edge: measurement('0 mm'),       
			reach: measurement('1.1 m'),     
  	}
	)
};