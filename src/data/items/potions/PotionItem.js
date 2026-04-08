export { Language } from '../../helpers/Language.js';

export class Potion {
	constructor(id) {
		this.internalId = 0;
		this.id = id;
		this.displayName = id;
		this.description = '';
		this.tags = [];
		this.rarity = 'common';
		this.stackable = 1;
		this.subtype = 'potion';
		this.localization = {};
		this.volume = 0;
		this.concentration = 1;
		this.servings = 1;
		this.onset = 0;
		this.duration = 0;
		this.school = '';
		this.effects = [];
		this.mixable = false;
		this.volatile = false;
		this.viscosity = 0;
		this.containerType = 'vial';
		this.cursed = false;
		this.perishable = false;
		this.shelfLife = null;
		this.spoilage = 0;
		this.spoiledId = null;
		this.created_at = '';
	}

	setInternalId(value) { this.internalId = value; return this; }
	setDisplayName(value) { this.displayName = value; return this; }
	setDescription(value) { this.description = value; return this; }
	setTags(...values) { this.tags = values.flat(); return this; }
	setRarity(value) { this.rarity = value; return this; }
	setStackable(value) { this.stackable = value; return this; }
	setLocalization(value) { this.localization = value; return this; }
	addLocalization(language) {
		this.localization[language.code] = {
			displayName: language.displayName,
			description: language.description
		};
		return this;
	}
	setVolume(value) { this.volume = value; return this; }
	setConcentration(value) { this.concentration = value; return this; }
	setServings(value) { this.servings = value; return this; }
	setOnset(value) { this.onset = value; return this; }
	setDuration(value) { this.duration = value; return this; }
	setSchool(value) { this.school = value; return this; }
	setEffects(value) { this.effects = value; return this; }
	addEffect(value) { this.effects.push(value); return this; }
	setMixable(value = true) { this.mixable = value; return this; }
	setVolatile(value = true) { this.volatile = value; return this; }
	setViscosity(value) { this.viscosity = value; return this; }
	setContainerType(value) { this.containerType = value; return this; }
	setCursed(value = true) { this.cursed = value; return this; }
	setPerishable(value = true) { this.perishable = value; return this; }
	setShelfLife(value) { this.shelfLife = value; return this; }
	setSpoilage(value) { this.spoilage = value; return this; }
	setSpoiledId(value) { this.spoiledId = value; return this; }
	setCreatedAt(value) { this.created_at = value; return this; }
	setArchived(value = true) { this.archived = value; return this; }
}
