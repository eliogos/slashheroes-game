import type {
	ArmorDefinition,
	ArmorLocalization,
	ArmorQualityMultipliers,
} from '../types.js';

export const DEFAULT_ARMOR_QUALITY_MULTIPLIERS: Readonly<ArmorQualityMultipliers> = {
	protection: 1,
};

type ArmorInput = Omit<
	Partial<ArmorDefinition>,
	'tags' | 'localization' | 'qualityMultipliers'
> & {
		id?: string;
		tags?: string[];
		localization?: ArmorLocalization;
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
		displayName,
		type = 'helm',
		material = 'paper',
		tags = [],
		localization = {},
		qualityMultipliers = {},
		...rest
	} = armor;

	const resolvedId = id ?? buildArmorId(material, type);

	return {
		internalId: 0,
		id: resolvedId,
		displayName: displayName ?? resolvedId,
		type,
		material,
		description: '',
		created_at: '',
		...rest,
		tags: [...tags],
		localization: { ...localization },
		qualityMultipliers: {
			...DEFAULT_ARMOR_QUALITY_MULTIPLIERS,
			...qualityMultipliers,
		},
	};
}
