export { WEAPON_FAMILY } from '../../helpers/constants.js';
export { Language } from '../../helpers/Language.js';

export class Ammo {
	constructor(id) {
		this.internalId = 0;
		this.id = id;
		this.displayName = id;
		this.description = '';
		this.tags = [];
		this.localization = {};
		this.qualities = { weight: 0 };
		this.compatibleFamilyFlag = 0;
		this.weaponAmplifiers = {};
		this.created_at = '';
	}

	setInternalId(value) { this.internalId = value; return this; }
	setDisplayName(value) { this.displayName = value; return this; }
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
	setQualities(value) { this.qualities = { ...this.qualities, ...value }; return this; }
	setWeight(value) { this.qualities.weight = value; return this; }
	setCompatibleFamilies(flag) { this.compatibleFamilyFlag = flag; return this; }
	setWeaponAmplifiers(value) { this.weaponAmplifiers = { ...value }; return this; }
	addWeaponAmplifier(weaponId, multiplier) {
		this.weaponAmplifiers[weaponId] = multiplier;
		return this;
	}
	setCreatedAt(value) { this.created_at = value; return this; }
	setArchived(value = true) { this.archived = value; return this; }
}
