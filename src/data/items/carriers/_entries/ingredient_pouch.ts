import { defineCarrier } from '../helpers/index.js';

export const ingredientPouch = defineCarrier({
	internalId: 8,
	id: 'ingredient_pouch',
	display: {
			en: {
				name: 'Ingredient Pouch',
				description: 'A drawstring pouch lined with small compartments. Ingredients stay sorted, stacked as each one allows, and don\'t contaminate each other. Mostly.',
			},
		},
	rarity: 'common',
	allowedTypes: ['ingredient'],
	slots: 30,
	acquiredFrom: ['shop', 'merchant'],
	created_at: '2026-03-31T00:00:00.000Z',
});
