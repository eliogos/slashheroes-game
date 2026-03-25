import convert from 'convert-units';

export function convertWeaponUnits(q) {
	return {
		weight: convert(q.weight).from('kg').to('g'),        												// weight as grams
		speed:  convert(q.speed).from('m/s').to('m/s'),     												// keep as metre per second
		edge:   convert(q.edge).from('mm').to('mm'),        												// keep as millimetre
		reach:  convert(q.reach).from('m').to('cm'),        												// reach as centimetre
		curvature: q.curvature ? convert(q.curvature).from('deg').to('rad') : 0			// curvature as radians
	};
}