import { resolveDisplay, type ItemDisplayInput } from '../../helpers/display.js';
import type {
	AmmoDefinition,
	AmmoQualities,
	AmmoWeaponAmplifiers,
} from '../types.js';

export const DEFAULT_AMMO_QUALITIES: Readonly<AmmoQualities> = {
	weight: 0,
};

type AmmoInput = Omit<
	Partial<AmmoDefinition>,
	'id' | 'qualities' | 'weaponAmplifiers' | 'display'
> &
	Pick<AmmoDefinition, 'id'> & {
		qualities?: Partial<AmmoQualities>;
		weaponAmplifiers?: AmmoWeaponAmplifiers;
		display?: ItemDisplayInput;
	};

/** Create an ammo definition while filling omitted fields with sensible defaults. */
export function defineAmmo(ammo: AmmoInput): AmmoDefinition {
	const {
		id,
		display = {},
		qualities = {},
		weaponAmplifiers = {},
		...rest
	} = ammo;
	const resolvedDisplay = resolveDisplay(id, display);

	return {
		internalId: 0,
		compatibleFamilyFlag: 0,
		created_at: '',
		...rest,
		id,
		display: resolvedDisplay,
		qualities: {
			...DEFAULT_AMMO_QUALITIES,
			...qualities,
		},
		weaponAmplifiers: { ...weaponAmplifiers },
	};
}
