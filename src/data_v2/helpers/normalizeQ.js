export function normalizeQualities(q) {
	return {
		weight: q.weight.as('g'),
		speed: Math.round(q.speed.as('m/s')),
		edge: Math.round(q.edge.as('mm')),
		reach: Math.round(q.reach.as('cm'))
	}
}