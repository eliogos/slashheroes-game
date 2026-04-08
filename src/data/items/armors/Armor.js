import { ARMOR_TYPE } from './typeConfigs.js';

export { ARMOR_TYPE } from './typeConfigs.js';
export { Language } from '../../helpers/Language.js';

export class Armor {
	constructor(id) {
		this.internalId = 0;
		this.id = id;
		this.displayName = id;
		this.type = ARMOR_TYPE.HELM;
		this.material = '';
		this.description = '';
		this.tags = [];
		this.localization = {};
		this.qualityMultipliers = { protection: 1 };
		this.created_at = '';
	}

	setInternalId(value) { this.internalId = value; return this; }
	setDisplayName(value) { this.displayName = value; return this; }
	setType(value) { this.type = value; return this; }
	setMaterial(value) { this.material = value; return this; }
	setDescription(value) { this.description = value; return this; }
	setTags(...values) { this.tags = values.flat(); return this; }
	setLocalization(value) { this.localization = value; return this; }
	addLocalization(language) {
		this.localization[language.code] = {
			displayName: language.displayName,
			description: language.description
		};
		return this;
	}
	setQualityMultipliers(value) {
		this.qualityMultipliers = { ...this.qualityMultipliers, ...value };
		return this;
	}
	setProtectionMod(value) { this.qualityMultipliers.protection = value; return this; }
	setCreatedAt(value) { this.created_at = value; return this; }
	setArchived(value = true) { this.archived = value; return this; }
}
