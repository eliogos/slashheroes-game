import { resolveDisplay, type ItemDisplayInput } from '../../helpers/display.js';
import { buildWeaponFamilyFlag } from './familyConfigs.js';
import type {
	WeaponDefinition,
	WeaponEffect,
	WeaponQualityMultipliers,
} from './types.js';

type WeaponFamilyInput = number | string | Array<number | string>;

type WeaponInput = Omit<
	Partial<WeaponDefinition>,
	'id' | 'display' | 'qualityMultipliers' | 'familyFlag' | 'effect'
> &
	Pick<WeaponDefinition, 'id'> & {
		display?: ItemDisplayInput;
		qualityMultipliers?: Partial<WeaponQualityMultipliers>;
		families?: WeaponFamilyInput;
		family?: WeaponFamilyInput;
		familyFlag?: number;
		effect?: WeaponEffect | null;
	};

export function defineWeapon(weapon: WeaponInput): WeaponDefinition {
	const {
		id,
		display = {},
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
	const resolvedDisplay = resolveDisplay(id, display);

	return {
		internalId: 0,
		id,
		display: resolvedDisplay,
		tier: 1,
		grip: 1,
		created_at: '',
		...rest,
		qualityMultipliers: { ...qualityMultipliers },
		familyFlag: resolvedFamilyFlag,
		effect,
	};
}
