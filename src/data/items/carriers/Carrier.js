export { Language } from '../../helpers/Language.js';

export class Carrier {
	constructor(id) {
		this.internalId = 0;
		this.id = id;
		this.displayName = id;
		this.description = '';
		this.tags = [];
		this.rarity = 'common';
		this.unique = true;
		this.stackable = false;
		this.localization = {};
		this.occupiedSlots = 1;
		this.quickAccess = false;
		this.allowedTypes = null;
		this.allowedTags = null;
		this.slots = null;
		this.stackLimitPerType = null;
		this.mergeable = false;
		this.mergeTiers = [];
		this.effectMode = null;
		this.equipSlot = null;
		this.acquiredFrom = [];
		this.effects = [];
		this.created_at = '';
	}

	setInternalId(value) { this.internalId = value; return this; }
	setDisplayName(value) { this.displayName = value; return this; }
	setDescription(value) { this.description = value; return this; }
	setTags(...values) { this.tags = values.flat(); return this; }
	setRarity(value) { this.rarity = value; return this; }
	setUnique(value = true) { this.unique = value; return this; }
	setStackable(value) { this.stackable = value; return this; }
	setLocalization(value) { this.localization = value; return this; }
	setOccupiedSlots(value) { this.occupiedSlots = value; return this; }
	setQuickAccess(value = true) { this.quickAccess = value; return this; }
	setAllowedTypes(...values) { this.allowedTypes = values.flat(); return this; }
	setAllowedTags(...values) { this.allowedTags = values.flat(); return this; }
	setSlots(value) { this.slots = value; return this; }
	setStackLimitPerType(value) { this.stackLimitPerType = value; return this; }
	setMergeable(value = true) { this.mergeable = value; return this; }
	setMergeTiers(...values) { this.mergeTiers = values.flat(); return this; }
	setEffectMode(value) { this.effectMode = value; return this; }
	setEquipSlot(value) { this.equipSlot = value; return this; }
	setAcquiredFrom(...values) { this.acquiredFrom = values.flat(); return this; }
	setEffects(value) { this.effects = value; return this; }
	addEffect(value) { this.effects.push(value); return this; }
	setPadded(value = true) { this.padded = value; return this; }
	setWaterproof(value = true) { this.waterproof = value; return this; }
	setInsulated(value = true) { this.insulated = value; return this; }
	setLockable(value = true) { this.lockable = value; return this; }
	setCreatedAt(value) { this.created_at = value; return this; }
	setArchived(value = true) { this.archived = value; return this; }
}