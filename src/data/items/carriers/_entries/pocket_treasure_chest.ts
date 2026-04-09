import { defineCarrier } from '../helpers/index.js';

export const pocketTreasureChest = defineCarrier({
	internalId: 9,
	id: 'pocket_treasure_chest',
	displayName: 'Pocket Treasure Chest',
	description: 'A surprisingly sturdy miniature chest fitted with a clasp. Holds gems, jewelry, ores, and rings — the kind of things too valuable to rattle around loose in a pack.',
	tags: ['gem', 'jewelry', 'treasure'],
	rarity: 'uncommon',
	allowedTypes: ['gem', 'jewelry', 'ore', 'ring'],
	slots: 20,
	padded: true,
	lockable: true,
	acquiredFrom: ['shop', 'merchant'],
	created_at: '2026-03-31T00:00:00.000Z',
});
