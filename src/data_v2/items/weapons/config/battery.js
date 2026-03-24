import measurement from 'measurement';
import { normalizeQualities } from "../../../helpers/normalizeQ";

export default {
	id: "FAM_BATT",
	variance: { min: 80, max: 120 },
	description: "These weapons need batteries to operate. Without it, it cannot be fully taken advantage of.",
	qualities: normalizeQualities(
		{
			weight: measurement('1.5 kg'),
			speed: measurement('6 m/s'),
			edge: measurement('5 mm'),
			reach: measurement('1 m'),
		}
	)
}