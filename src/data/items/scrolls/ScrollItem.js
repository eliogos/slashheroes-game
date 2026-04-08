export { Language } from '../../helpers/Language.js';

export class Scroll {
	constructor(id) {
		this.internalId = 0;
		this.id = id;
		this.displayName = id;
		this.description = '';
		this.tags = [];
		this.rarity = 'common';
		this.stackable = 1;
		this.subtype = 'scroll';
		this.localization = {};
		this.spellId = '';
		this.school = '';
		this.charges = 1;
		this.castTime = 0;
		this.intelligenceRequirement = null;
		this.failChance = 0;
		this.cursed = false;
		this.learnOnUse = false;
		this.fragile = true;
		this.singleUse = true;
		this.effects = [];
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
	setSpellId(value) { this.spellId = value; return this; }
	setSchool(value) { this.school = value; return this; }
	setCharges(value) { this.charges = value; return this; }
	setCastTime(value) { this.castTime = value; return this; }
	setIntelligenceRequirement(value) { this.intelligenceRequirement = value; return this; }
	setFailChance(value) { this.failChance = value; return this; }
	setCursed(value = true) { this.cursed = value; return this; }
	setLearnOnUse(value = true) { this.learnOnUse = value; return this; }
	setFragile(value = true) { this.fragile = value; return this; }
	setSingleUse(value = true) { this.singleUse = value; return this; }
	setEffects(value) { this.effects = value; return this; }
	addEffect(value) { this.effects.push(value); return this; }
	setCreatedAt(value) { this.created_at = value; return this; }
	setArchived(value = true) { this.archived = value; return this; }
}
