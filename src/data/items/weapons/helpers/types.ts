import type { ItemDisplay } from '../../helpers/display.js';

export interface WeaponQualityMultipliers {
	weight?: number;
	speed?: number;
	edge?: number;
	reach?: number;
	curvature?: number;
}

export interface WeaponQualitySet {
	weight: number;
	speed: number;
	edge: number;
	reach: number;
	curvature: number;
}

export interface WeaponDamageProfile {
	weight?: number;
	speed?: number;
	edge?: number;
	reach?: number;
}

export type WeaponEffect = Record<string, unknown>;

export interface WeaponDefinition {
	internalId: number;
	id: string;
	display: ItemDisplay;
	tier: number;
	grip: 0 | 1 | 2;
	qualityMultipliers: WeaponQualityMultipliers;
	familyFlag: number;
	effect: WeaponEffect | null;
	created_at: string;
	archived?: boolean;
}

export type ActiveWeaponDefinition = WeaponDefinition & { archived?: false | undefined };

export interface WeaponFamilyDefinition {
	id: number;
	key: string;
	description: string;
	damageProfile: WeaponDamageProfile | null;
	qualities: WeaponQualitySet;
}
