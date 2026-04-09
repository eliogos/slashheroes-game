import type {
	AmmoDefinition,
	AmmoLocalization,
	AmmoQualities,
	AmmoWeaponAmplifiers,
} from '../types.js';

export const DEFAULT_AMMO_QUALITIES: Readonly<AmmoQualities> = {
	weight: 0,
};

type AmmoInput = Omit<
	Partial<AmmoDefinition>,
	'id' | 'qualities' | 'weaponAmplifiers' | 'tags' | 'localization'
> &
	Pick<AmmoDefinition, 'id'> & {
		qualities?: Partial<AmmoQualities>;
		weaponAmplifiers?: AmmoWeaponAmplifiers;
		tags?: string[];
		localization?: AmmoLocalization;
	};

/** Create an ammo definition while filling omitted fields with sensible defaults. */
export function defineAmmo(ammo: AmmoInput): AmmoDefinition {
	const {
		tags = [],
		localization = {},
		qualities = {},
		weaponAmplifiers = {},
		...rest
	} = ammo;

	return {
		internalId: 0,
		displayName: ammo.id,
		description: '',
		compatibleFamilyFlag: 0,
		created_at: '',
		...rest,
		tags: [...tags],
		localization: { ...localization },
		qualities: {
			...DEFAULT_AMMO_QUALITIES,
			...qualities,
		},
		weaponAmplifiers: { ...weaponAmplifiers },
	};
}
