export { WEAPON_FAMILY } from '../../helpers/constants.js';
export { Language } from '../../helpers/Language.js';

export class Weapon {
	constructor(id) {
		this.internalId = 0;
		this.id = id;
		this.displayName = id;
		this.description = '';
		this.tags = [];
		this.localization = {};
		this.tier = 1;
		this.grip = 1;
		this.qualityMultipliers = {};
		this.familyFlag = 0;
		this.effect = null;
		this.created_at = '';
	}

	setInternalId(value) { this.internalId = value; return this; }
	setDisplayName(value) { this.displayName = value; return this; }
	setDescription(value) { this.description = value; return this; }
	setTags(...values) { this.tags = values.flat(); return this; }
	setLocalization(value) { this.localization = value; return this; }
	setTier(value) { this.tier = value; return this; }
	setGrip(value) { this.grip = value; return this; }
	setCreatedAt(value) { this.created_at = value; return this; }

	setFamilies(flag) {
		this.familyFlag = flag;
		return this;
	}

	addLocalization(language) {
		this.localization[language.code] = {
			displayName: language.displayName,
			description: language.description
		};
		return this;
	}

	setQualityMultipliers(value) { this.qualityMultipliers = value; return this; }
	setWeightMod(value) { this.qualityMultipliers.weight = value; return this; }
	setSpeedMod(value) { this.qualityMultipliers.speed = value; return this; }
	setEdgeMod(value) { this.qualityMultipliers.edge = value; return this; }
	setReachMod(value) { this.qualityMultipliers.reach = value; return this; }
	setCurvatureMod(value) { this.qualityMultipliers.curvature = value; return this; }

	setEffect(value) { this.effect = value; return this; }

	setArchived(value = true) { this.archived = value; return this; }
}
