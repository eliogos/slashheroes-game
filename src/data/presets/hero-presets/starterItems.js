import { STARTER_ARMORS, getStarterArmorByKey } from './starterArmors.js';
import {
	STARTER_ARTIFACTS,
	STARTER_BAGS,
	STARTER_CARRIERS,
	STARTER_INTERNAL_ITEMS,
	STARTER_LONGRANGE,
	STARTER_RINGS,
	STARTER_UTILITY,
	getStarterArtifactByKey,
	getStarterBagByKey,
	getStarterCarrierByKey,
	getStarterLongrangeByKey,
	getStarterRingByKey,
	getStarterUtilityByKey,
} from './starterInternal.js';
import { getStarterItemAssignment } from './starterItemAssignments.js';
import { STARTER_WEAPONS, getStarterWeaponByKey } from './starterWeapons.js';

export const STARTER_ITEMS = [
	...STARTER_WEAPONS,
	...STARTER_ARMORS,
	...STARTER_INTERNAL_ITEMS,
];

export function getStarterItemsByType(itemType) {
	return STARTER_ITEMS.filter((item) => item.item_type === itemType);
}

export function getStarterItemByKey(itemKey) {
	return STARTER_ITEMS.find((item) => item.key === itemKey) || null;
}

export function resolveClassStarterLoadout(heroClass, race) {
	const raceId = race?.id || null;
	const classId = heroClass?.id || null;
	const selectionAssignment = getStarterItemAssignment(raceId, classId) || {};

	const preferredWeaponTypes = heroClass?.preferredWeaponTypes || [];
	const defaultWeapon = STARTER_WEAPONS.find((item) => preferredWeaponTypes.includes(item.subtype)) || STARTER_WEAPONS[0] || null;

	const className = String(heroClass?.name || '').toLowerCase();
	let preferredArmorKey = 'padded_tunic';
	if (['rogue', 'ranger', 'monk'].includes(className)) preferredArmorKey = 'leather_vest';
	if (['mage', 'cleric', 'bard'].includes(className)) preferredArmorKey = 'cloth_robe';

	const defaultArmor = getStarterArmorByKey(preferredArmorKey) || STARTER_ARMORS[0] || null;

	const classAssign = heroClass?.starterAssignments || {};
	const raceAssign = race?.starterAssignments || {};
	const mergedAssign = {};
	const applyAssign = (source) => {
		for (const key of ['weapon', 'armor', 'artifact', 'ring', 'carrier', 'bag', 'longrange', 'utility']) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				mergedAssign[key] = source[key];
			}
		}
	};

	applyAssign(classAssign);
	applyAssign(raceAssign);
	applyAssign(selectionAssignment);

	const weaponKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'weapon')
		? mergedAssign.weapon
		: defaultWeapon?.key || null;
	const armorKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'armor')
		? mergedAssign.armor
		: defaultArmor?.key || null;
	const artifactKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'artifact')
		? mergedAssign.artifact
		: null;
	const ringKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'ring')
		? mergedAssign.ring
		: null;
	const carrierKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'carrier')
		? mergedAssign.carrier
		: null;
	const bagKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'bag')
		? mergedAssign.bag
		: null;
	const longrangeKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'longrange')
		? mergedAssign.longrange
		: null;
	const utilityKey = Object.prototype.hasOwnProperty.call(mergedAssign, 'utility')
		? mergedAssign.utility
		: 'bread';

	const weapon = weaponKey ? getStarterWeaponByKey(weaponKey) : null;
	const armor = armorKey ? getStarterArmorByKey(armorKey) : null;
	const artifact = artifactKey ? getStarterArtifactByKey(artifactKey) : null;
	const ring = ringKey ? getStarterRingByKey(ringKey) : null;
	const carrier = carrierKey ? getStarterCarrierByKey(carrierKey) : null;
	const bag = bagKey ? getStarterBagByKey(bagKey) : null;
	const longrange = longrangeKey ? getStarterLongrangeByKey(longrangeKey) : null;
	const utility = utilityKey ? getStarterUtilityByKey(utilityKey) : null;

	return {
		weapon,
		armor,
		artifact,
		ring,
		carrier,
		bag,
		longrange,
		utility,
		weaponKey: weapon?.key || null,
		armorKey: armor?.key || null,
		artifactKey: artifact?.key || null,
		ringKey: ring?.key || null,
		carrierKey: carrier?.key || null,
		bagKey: bag?.key || null,
		longrangeKey: longrange?.key || null,
		utilityKey: utility?.key || null,
	};
}

export {
	STARTER_WEAPONS,
	STARTER_ARMORS,
	STARTER_ARTIFACTS,
	STARTER_RINGS,
	STARTER_CARRIERS,
	STARTER_BAGS,
	STARTER_LONGRANGE,
	STARTER_UTILITY,
	getStarterWeaponByKey,
	getStarterArmorByKey,
};
