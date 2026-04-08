export { Language } from '../../helpers/Language.js';

export class Edible {
	constructor(id) {
		this.internalId = 0;
		this.id = id;
		this.displayName = id;
		this.description = '';
		this.tags = [];
		this.rarity = 'common';
		this.stackable = 1;
		this.subtype = 'food';
		this.localization = {};
		this.satiation = 0;
		this.requiresCooking = false;
		this.cookedFormId = null;
		this.refrigeratable = false;
		this.decay = 0;
		this.effects = [];
		this.created_at = '';
	}

	setInternalId(value) { this.internalId = value; return this; }
	setDisplayName(value) { this.displayName = value; return this; }
	setDescription(value) { this.description = value; return this; }
	setTags(...values) { this.tags = values.flat(); return this; }
	setRarity(value) { this.rarity = value; return this; }
	setStackable(value) { this.stackable = value; return this; }
	setSubtype(value) { this.subtype = value; return this; }
	setLocalization(value) { this.localization = value; return this; }
	addLocalization(language) {
		this.localization[language.code] = {
			displayName: language.displayName,
			description: language.description
		};
		return this;
	}
	setSatiation(value) { this.satiation = value; return this; }
	setRequiresCooking(value = true) { this.requiresCooking = value; return this; }
	setCookedFormId(value) { this.cookedFormId = value; return this; }
	setRefrigeratable(value = true) { this.refrigeratable = value; return this; }
	setDecay(value) { this.decay = value; return this; }
	setEffects(value) { this.effects = value; return this; }
	addEffect(value) { this.effects.push(value); return this; }
	setCreatedAt(value) { this.created_at = value; return this; }
	setArchived(value = true) { this.archived = value; return this; }
}
