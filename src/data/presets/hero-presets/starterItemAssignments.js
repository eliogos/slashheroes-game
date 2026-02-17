// Dynamic overrides for a specific race + class selection.
// Key format: "<raceId>:<classId>"
// Use null to explicitly remove a starter slot.
export const STARTER_ITEM_ASSIGNMENTS = {
	// Fairy + Mage: starts with no weapon/armor, scroll-based start.
	'8:3': {
		weapon: null,
		armor: null,
		utility: 'mysterious_scroll',
	},
	// Halfling + Rogue: agile opener with ring + throwable utility.
	'5:2': {
		weapon: 'twin_daggers',
		armor: 'leather_vest',
		ring: 'ring_of_satiety',
		longrange: 'throwing_stone',
		utility: 'small_health_potion',
	},
	// Dwarf + Warrior: heavy start with an artifact.
	'3:1': {
		artifact: 'shark_tooth_necklace',
	},
};

export function getStarterItemAssignment(raceId, classId) {
	const key = `${raceId}:${classId}`;
	return STARTER_ITEM_ASSIGNMENTS[key] || null;
}
