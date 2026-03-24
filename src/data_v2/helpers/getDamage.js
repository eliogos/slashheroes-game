export function getMaxWeight(weapons) {
	return weapons.reduce((max, w) => Math.max(max, w.qualities.weight), 0);
}

export function getMaxSpeed(weapons) {
  return weapons.reduce((max, w) => Math.max(max, w.qualities.speed), 0);
}

export function getMaxEdge(weapons) {
  return weapons.reduce((max, w) => Math.max(max, w.qualities.edge), 0);
}

export function getMaxEdge(weapons) {
  return weapons.reduce((max, w) => Math.max(max, w.qualities.edge), 0);
}

export function getMaxQualities(weapons) {
  return {
    weight: getMaxWeight(weapons),
    speed:  getMaxSpeed(weapons),
    edge:   getMaxEdge(weapons),
    reach:  getMaxReach(weapons)
  };
}

/**
 * Normalize weapon qualities against the maxes
 * @param {Object} qualities - weapon qualities { weight, speed, edge, reach }
 * @param {Object} maxes - max qualities { weight, speed, edge, reach }
 * @returns {Object} normalized values 0–1
 */
export function normalizeMaxQualities(qualities, maxes) {
  const EPSILON = 1e-6; // fallback to avoid divide by zero
  return {
    weight: qualities.weight / (maxes.weight || EPSILON),
    speed:  qualities.speed  / (maxes.speed  || EPSILON),
    edge:   qualities.edge   / (maxes.edge   || EPSILON),
    reach:  qualities.reach  / (maxes.reach  || EPSILON)
  };
}

/**
 * Calculate the base damage from qualities only
 */
export function getBaseDamage(
  weapon,
  allWeapons,
  weights = { weight: 0.3, speed: 0.2, edge: 0.3, reach: 0.2 },
  baseMultiplier = 100
) {
  const maxes = getMaxQualities(allWeapons);
  const norm = normalizeMaxQualities(weapon.qualities, maxes);

  const score =
    norm.weight * weights.weight +
    norm.speed  * weights.speed +
    norm.edge   * weights.edge +
    norm.reach  * weights.reach;

  const base = Math.round(score * baseMultiplier);
  return base;
}

/**
 * Calculate min/max damage from baseDamage using variance percentages
 */
export function getDamageRange(baseDamage, variance = { min: 100, max: 100 }) {
  // min damage: base - base * (min% / 100)
  const min = Math.round(baseDamage - baseDamage * (variance.min / 100));
  
  // max damage: base + base * (max% / 100)
  const max = Math.round(baseDamage + baseDamage * (variance.max / 100));

  return { min, max };
}