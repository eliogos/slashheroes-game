function defaultDurabilityForType(itemType) {
	if (itemType === 'weapon' || itemType === 'armor') {
		return { current: 100, max: 100 };
	}
	return null;
}

export function createStarterItem(definition) {
	const itemType = definition.item_type;
	const enchantment = definition.enchantment || {};
	const material = definition.material || {};
	const inferredRole = itemType === 'ring'
		? 'modifier'
		: itemType === 'artifact'
			? 'chaotic'
			: null;
	const isBagType = itemType === 'bag';
	const defaultAllowedTypes = itemType === 'bag'
		? ['weapon', 'armor', 'artifact', 'ring', 'longrange', 'utility']
		: [];

	return {
		id: 0, // Starter items always use id 0 in presets.
		key: definition.key, // Stable internal key used for lookups/mapping.
		name: definition.name, // Display name shown to players.
		item_type: itemType, // Top-level category: weapon, armor, artifact, ring, carriers, bag, longrange, utility.
		subtype: definition.subtype || null, // More specific classification inside item_type.
		item_role: definition.item_role || inferredRole, // Item behavior role (ex: modifier, chaotic).
		tier: definition.tier ?? 1, // Power/progression tier. Starters are tier 1.
		rarity: definition.rarity || 'common', // Loot rarity label.
		upgradable: definition.upgradable ?? true, // Whether upgrades are allowed for this item.
		equippable: definition.equippable ?? false, // Whether item can be equipped.
		consumable: definition.consumable ?? false, // Whether item is consumed on use.
		stackable: definition.stackable ?? false, // Whether multiple copies can stack in one slot.
		max_stack: definition.max_stack ?? 1, // Max stack count when stackable is true.
		weight: Number(definition.weight ?? 0), // Item weight in grams (REAL in DB); used for STR/load calculations.
		material: {
			id: material.id || 'generic', // Material id. Combustibility and element vulnerability are resolved from this id.
		},
		sell_value: definition.sell_value ?? 0, // Vendor sell price (base value).
		buy_value: definition.buy_value ?? 0, // Vendor buy price (base value).
		tags: definition.tags || ['starter'], // Free-form labels for filtering/content rules.
		// Keep shared fields top-level. Put item-type-specific data under type_data.
		type_data: {
			durability: definition.durability || defaultDurabilityForType(itemType),
			enchantment: {
				element_id: enchantment.element_id ?? null,
				mods: enchantment.mods || {},
				is_cursed: enchantment.is_cursed ?? false,
			},
			mods: definition.mods || {},
			effects: definition.effects || [],
			requirements: definition.requirements || {},
			max_weight: isBagType ? Number(definition.max_weight ?? 0) : null,
			allowed_item_types: isBagType ? (definition.allowed_item_types || defaultAllowedTypes) : [],
		},
	};
}

