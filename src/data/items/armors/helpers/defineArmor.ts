import { resolveDisplay, type ItemDisplayInput } from '../../helpers/display.js';
import type {
	ArmorDefinition,
	ArmorQualityMultipliers,
} from '../types.js';

export const DEFAULT_ARMOR_QUALITY_MULTIPLIERS: Readonly<ArmorQualityMultipliers> = {
	protection: 1,
};

type ArmorInput = Omit<
	Partial<ArmorDefinition>,
	'display' | 'qualityMultipliers'
> & {
		id?: string;
		display?: ItemDisplayInput;
		qualityMultipliers?: Partial<ArmorQualityMultipliers>;
	};

export function buildArmorId(
	material: ArmorDefinition['material'],
	type: ArmorDefinition['type'],
): ArmorDefinition['id'] {
	return `${material}_${type}`;
}

/** Create an armor definition while filling omitted fields with sensible defaults. */
export function defineArmor(armor: ArmorInput): ArmorDefinition {
	const {
		id,
		display = {},
		type = 'helm',
		material = 'paper',
		qualityMultipliers = {},
		...rest
	} = armor;

	const resolvedId = id ?? buildArmorId(material, type);
	const resolvedDisplay = resolveDisplay(resolvedId, display);

	return {
		internalId: 0,
		id: resolvedId,
		type,
		material,
		display: resolvedDisplay,
		created_at: '',
		...rest,
		qualityMultipliers: {
			...DEFAULT_ARMOR_QUALITY_MULTIPLIERS,
			...qualityMultipliers,
		},
	};
}
