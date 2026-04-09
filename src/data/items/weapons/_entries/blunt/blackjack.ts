import { defineWeapon, BLUNT } from '../../helpers/index.js';

export const blackjack = defineWeapon({
	internalId: 33,
	id: 'blackjack',
	displayName: 'Blackjack',
	description: 'A concealed weighted striker built for sudden, brutal impacts.',
	tags: [
	'covert',
	'weighted',
	'compact',
],
	tier: 2,
	grip: 1,
	families: BLUNT,
	qualityMultipliers: {
		weight: 0.76,
		speed: 1.12,
		reach: 0.7,
	},
	created_at: '2026-03-26T13:50:55.126Z',
});
