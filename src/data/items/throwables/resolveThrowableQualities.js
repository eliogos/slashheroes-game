import { resolveFamilyQualities } from '../../helpers/resolveFamilyQualities.js';

export const THROWABLE_BASE_QUALITY_BONUS = Object.freeze({
	reach: 40,
	curvature: Math.PI / 18
});

export function applyThrowableBaseQualityBonus(qualities) {
	return {
		...qualities,
		reach: qualities.reach + THROWABLE_BASE_QUALITY_BONUS.reach,
		curvature: qualities.curvature + THROWABLE_BASE_QUALITY_BONUS.curvature
	};
}

export function resolveThrowableQualities(throwable, families) {
	return applyThrowableBaseQualityBonus(resolveFamilyQualities(throwable, families));
}
