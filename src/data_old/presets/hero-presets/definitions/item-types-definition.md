# Item Types Definition

Canonical `item_type` values for preset and DB content.

## Item Types

| item_type | Purpose | Notes |
| --- | --- | --- |
| `weapon` | Main hand/off-hand combat item | Usually has durability |
| `armor` | Defensive equipment piece | Usually has durability |
| `artifact` | Special equip item with unusual/random behavior | Usually no durability |
| `ring` | Modifier-focused equipment that changes player behavior/stats | Usually no durability |
| `carriers` | Type-specific protective container | Auto-protects relevant item type(s) |
| `bag` | General container for mixed item types | Has `max_weight`, usually broad `allowed_item_types` |
| `longrange` | Thrown/ammo-style ranged item | Single-use per throw, stackable |
| `utility` | Usable support item (potions, food, tools, kits) | Often consumable |

## Subtype Definitions

| item_type | common subtypes |
| --- | --- |
| `weapon` | `sword`, `dagger`, `staff`, `mace`, `bow`, `scepter`, `fist` |
| `armor` | `helmet`, `chest`, `legs`, `boots`, `gloves`, `shield` |
| `artifact` | `necklace`, `relic`, `totem`, `lamp`, `spellbook` |
| `ring` | `hunger`, `health`, `mana`, `luck`, `resistance`, `speed` |
| `carriers` | `utility_container`, `ammo_case`, `potion_case` |
| `bag` | `general_bag`, `travel_pack` |
| `longrange` | `thrown`, `arrow`, `bolt`, `javelin`, `knife` |
| `utility` | `potion`, `food`, `scroll`, `toolkit`, `key` |

Bag sizing guideline:
- `basic_backpack`: default bag for normal/large races.
- `basic_satchel`: small-race bag variant (lighter/lower capacity).

## Pricing/Weight Rule

- `sell_value` and `buy_value` are **base values** only.
- Shop systems should apply their own modifiers (discounts, taxes, reputation, etc.).
- `weight` is stored in grams and maps to DB `REAL`.
- Total carried `weight` can affect STR/load behavior.
- Bags limit what they can hold via:
  - `type_data.max_weight`
  - `type_data.allowed_item_types`
- Carriers are type-specific protective containers and do not use bag capacity fields.

## Schema Shape

Shared fields are top-level. Type-specific fields are grouped under `type_data`.

### Shared fields

| field | type | meaning |
| --- | --- | --- |
| `id` | `number` | Item id in preset data. Starter presets currently use `0`. |
| `key` | `string` | Stable internal identifier used in code/db references. |
| `name` | `string` | Display name. |
| `item_type` | `string` | Top-level category (`weapon`, `armor`, `artifact`, `ring`, `carriers`, `bag`, `longrange`, `utility`). |
| `subtype` | `string \| null` | Detailed type under `item_type` (`sword`, `food`, `lamp`, etc.). |
| `item_role` | `string \| null` | Behavioral role label (e.g. `modifier` for rings, `chaotic` for artifacts). |
| `tier` | `number` | Power/progression tier of the item. |
| `rarity` | `string` | Rarity label (see rarity definition map). |
| `upgradable` | `boolean` | Whether this item can be upgraded. |
| `equippable` | `boolean` | Whether item can be equipped in a slot. |
| `consumable` | `boolean` | Whether item is consumed on use. |
| `stackable` | `boolean` | Whether multiple copies can occupy one inventory slot. |
| `max_stack` | `number` | Maximum quantity in one stack. |
| `weight` | `number` | Item weight in grams (`REAL`). |
| `material` | `object` | Material metadata. |
| `material.id` | `string` | Material id (`leather`, `canvas`, `iron`, etc.). |
| `material.*` | `lookup` | Combustibility and element vulnerability are derived from `material.id` (material table/definition), not stored per item. |
| `sell_value` | `number` | Base sell price before shop modifiers. |
| `buy_value` | `number` | Base buy price before shop modifiers. |
| `tags` | `string[]` | Free-form labels for filtering and rules. |

### `type_data` fields

| field | type | meaning |
| --- | --- | --- |
| `type_data.durability` | `object \| null` | Durability state for gear (`{ current, max }`). |
| `type_data.enchantment` | `object` | Enchantment metadata. |
| `type_data.enchantment.element_id` | `string \| null` | Element id (`fire`, `ice`, etc.). |
| `type_data.enchantment.mods` | `object` | Stat changes from enchantment. |
| `type_data.enchantment.is_cursed` | `boolean` | Whether enchantment is cursed. |
| `type_data.mods` | `object` | Base stat modifiers applied by item. |
| `type_data.effects` | `array` | Effect entries applied on use/equip/trigger. |
| `type_data.requirements` | `object` | Requirements to use/equip (`level`, `class`, etc.). |
| `type_data.max_weight` | `number \| null` | Bag max load in grams (`bag` only). |
| `type_data.allowed_item_types` | `string[]` | Item types allowed inside bag (`bag` only). |

## Examples Per Item Type

### Weapon example

```json
{
  "id": 0,
  "key": "iron_sword",
  "name": "Iron Sword",
  "item_type": "weapon",
  "subtype": "sword",
  "tier": 1,
  "rarity": "common",
  "equippable": true,
  "consumable": false,
  "stackable": false,
  "weight": 1800.0,
  "material": {
    "id": "bronze"
  },
  "sell_value": 5,
  "buy_value": 12,
  "type_data": {
    "durability": { "current": 100, "max": 100 },
    "enchantment": { "element_id": null, "mods": {}, "is_cursed": false },
    "mods": {},
    "effects": [],
    "requirements": {},
    "max_weight": null,
    "allowed_item_types": []
  }
}
```

### Ring example

```json
{
  "id": 0,
  "key": "ring_of_satiety",
  "name": "Ring of Satiety",
  "item_type": "ring",
  "subtype": "hunger",
  "item_role": "modifier",
  "tier": 1,
  "rarity": "common",
  "equippable": true,
  "weight": 18.0,
  "material": {
    "id": "copper"
  },
  "sell_value": 5,
  "buy_value": 12,
  "type_data": {
    "durability": null,
    "enchantment": { "element_id": null, "mods": {}, "is_cursed": false },
    "mods": { "hun_decay_pct": -10 },
    "effects": [],
    "requirements": {},
    "max_weight": null,
    "allowed_item_types": []
  }
}
```

### Carrier example

```json
{
  "id": 0,
  "key": "utility_satchel",
  "name": "Utility Satchel",
  "item_type": "carriers",
  "subtype": "utility_container",
  "tier": 1,
  "rarity": "common",
  "equippable": true,
  "weight": 450.0,
  "sell_value": 8,
  "buy_value": 20,
  "type_data": {
    "durability": null,
    "enchantment": { "element_id": null, "mods": {}, "is_cursed": false },
    "mods": {},
    "effects": [],
    "requirements": {},
    "max_weight": null,
    "allowed_item_types": []
  }
}
```

### Bag example

```json
{
  "id": 0,
  "key": "basic_backpack",
  "name": "Basic Backpack",
  "item_type": "bag",
  "subtype": "general_bag",
  "tier": 1,
  "rarity": "common",
  "equippable": true,
  "weight": 650.0,
  "material": {
    "id": "canvas"
  },
  "sell_value": 10,
  "buy_value": 25,
  "type_data": {
    "durability": null,
    "enchantment": { "element_id": null, "mods": {}, "is_cursed": false },
    "mods": {},
    "effects": [],
    "requirements": {},
    "max_weight": 9000.0,
    "allowed_item_types": ["weapon", "armor", "artifact", "ring", "longrange", "utility", "carriers"]
  }
}
```

