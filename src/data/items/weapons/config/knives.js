import { convertWeaponUnits } from '../../../helpers/convertWeaponUnits.js';

export default {
	id: "KNIVES",
	description: "Knives are short blades that deal little but quicker damage.",
	qualities: convertWeaponUnits({
		weight: 1,
		speed: 15,
		edge: 12,        
		reach: 0.8,     
		curvature: 15  
	})
};