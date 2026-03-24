import measurement from 'measurement';
import { normalizeQualities } from '../../../helpers/normalizeQ';

export default {
  id: "FAM_AXE",
  variance: { min: 75, max: 125 },
  description: "Axes swing slow, but their heaviness makes up for the damage to deal.",
  qualities: normalizeQualities(
		{
			weight: measurement('3.5 kg'),
			speed: measurement('5 m/s'),       
			edge: measurement('15 mm'),       
			reach: measurement('1.2 m'),     
  	}
	)
};