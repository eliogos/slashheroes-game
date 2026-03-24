import measurement from 'measurement';
import { normalizeQualities } from '../../../helpers/normalizeQ';

export default {
	id: "FAM_BLADE",
	variance: { min: 85, max: 115 },
	description: "Swords are built for precision and balance. It is a very versatile weapon perfect for any combat.",
	qualities: normalizeQualities(
		{
			weight: measurement('1.5 kg'),
			speed: measurement('7 m/s'),       
			edge: measurement('8 mm'),       
			reach: measurement('1 m'),     
		}
	)
};