import { buildWeaponFamilyFlag } from './familyConfigs.js';
import type {
	WeaponDefinition,
	WeaponEffect,
	WeaponLocalization,
	WeaponQualityMultipliers,
} from './types.js';

type WeaponFamilyInput = number | string | Array<number | string>;

type WeaponInput = Omit<
	Partial<WeaponDefinition>,
	'id' | 'tags' | 'localization' | 'qualityMultipliers' | 'familyFlag' | 'effect'
> &
	Pick<WeaponDefinition, 'id'> & {
		tags?: string[];
		localization?: WeaponLocalization;
		qualityMultipliers?: Partial<WeaponQualityMultipliers>;
		families?: WeaponFamilyInput;
		family?: WeaponFamilyInput;
		familyFlag?: number;
		effect?: WeaponEffect | null;
	};

export function defineWeapon(weapon: WeaponInput): WeaponDefinition {
	const {
		id,
		displayName,
		tags = [],
		localization = {},
		qualityMultipliers = {},
		families = [],
		family,
		familyFlag,
		effect = null,
		...rest
	} = weapon;

	const resolvedFamilyFlag = typeof familyFlag === 'number'
		? familyFlag
		: buildWeaponFamilyFlag(family ?? families);

	return {
		internalId: 0,
		id,
		displayName: displayName ?? id,
		description: '',
		tier: 1,
		grip: 1,
		created_at: '',
		...rest,
		tags: [...tags],
		localization: { ...localization },
		qualityMultipliers: { ...qualityMultipliers },
		familyFlag: resolvedFamilyFlag,
		effect,
	};
}
