# Item Properties Reference

This document defines all properties across every item type in the game. Properties are organized
into three tiers: **Universal** (every item), **Shared** (multiple types), and **Type-Specific**.

---

## Architecture

```
Item
 ├── Universal properties          (all items)
 ├── Shared properties             (declared per group below)
 │    ├── Material properties      → armors only
 │    ├── Durability               → weapons, throwables, armors, artifacts, rings
 │    ├── Effects system           → weapons, throwables, armors, edibles, potions, scrolls, artifacts, rings
 │    ├── Expiry / perishability   → edibles, potions, ingredients
 │    └── Container properties     → bags, carriers
 └── Type-specific properties      (one section per item type)
```

Material properties are defined on a **material** entity (separate JSON) and referenced by the item
via `material`. Items can deviate per-property using `qualityMultipliers`.

**Effective value:** `material[property] × item.qualityMultipliers[property]`

---

## Universal Properties

Every item regardless of type.

| Property | Type | Description |
|---|---|---|
| `internalId` | integer | Unique numeric identifier (auto-incremented) |
| `id` | string | Unique slug (snake_case) |
| `displayName` | string | Shown in UI |
| `description` | string | Flavor text |
| `lore` | string? | Extended backstory — optional, for notable items |
| `tags` | string[] | Descriptive tags for filtering, trait interactions, and carrier restrictions |
| `rarity` | enum | `common` `uncommon` `rare` `epic` `legendary` `unique` |
| `weight` | number (g) | Physical weight in grams. Contributes to total carry weight and encumbrance |
| `value` | number | Base currency value — scales with rarity and condition |
| `stackable` | boolean \| integer | `false` = no stacking. Integer = max stack size |
| `localization` | object | i18n key-value overrides |
| `created_at` | ISO date | Creation timestamp |

---

## Shared Properties

---

### Material Properties

**Applies to:** armors

All values are normalized on a `-1` to `1` scale. `0` is neutral. Positive values express the trait
strongly. **Negative values invert the trait**, providing active resistance or the opposite behavior —
this is intentional and not merely "absence of the property". Design note: `malleability` and
`brittleness` are loosely opposed — a highly malleable material rarely shatters, but this is not
enforced.

| Property | `-1` (inverted) | `0` (neutral) | `+1` (full expression) | Gameplay Influence |
|---|---|---|---|---|
| `corrosion` | Actively repels oxidation — sealed, chemically inert | No notable reaction to environment | Rusts or rots rapidly in any moisture | Multiplied by climate humidity/acidity to produce passive durability decay rate. Negative = mild resistance bonus in harsh climates. Interacts with `porosity`. |
| `malleability` | Fully rigid — cannot be reshaped by any force | Moderate give under stress | Reshapes permanently under minimal force | Positive → better blunt absorption but deforms over time, reducing `coverage`. Negative → holds shape perfectly but `brittleness` fractures hit harder. |
| `conductivity` | Active insulator — grounds and disperses electricity | Neither conducts nor resists | Excellent conductor | Lightning damage multiplier. Negative = mild lightning resistance. Positive also triggers magnetic trap sensitivity and related enemy abilities. |
| `combustibility` | Fire-retardant — reduces incoming fire damage | Burns only under extreme sustained heat | Ignites on contact, burns hot and long | Fire damage multiplier. Negative = passive fire resistance. Positive = ignite chance on fire hit, burn DoT duration scales with value. |
| `porosity` | Hydrophobic — repels liquids entirely | Normal surface absorption | Highly absorbent — soaks through quickly | Positive → absorbs water (weight increase in rain), absorbs acid/poison. Negative → liquids bead off, no absorption penalties. Both directions interact with `corrosion`. |
| `brittleness` | Impact-absorbing — energy dissipates without fracturing | Normal fracture threshold | Shatters under sharp sudden stress | Positive → critical hits may permanently fracture the item, reducing `durabilityMax`. Negative = high resilience, fracture is nearly impossible. `elasticity` can partially offset positive values. |
| `acoustics` | Sound-dampening — quieter than ambient | Neutral noise output | Very loud — clanks and clangs with every move | Directly modifies stealth rating. Negative = stealth bonus from the material itself (treated cloth, padded leather). Positive = stealth penalty. |
| `toxicity` | Purifying — antimicrobial or antitoxin properties | No interaction with the wearer | Leaches harmful substances onto the user | Positive accumulates a poison or debuff stack per wear tick. Negative = minor passive cleanse, reducing existing minor poison stacks over time. |
| `hardness` | Very soft — indents and scratches easily | Average surface resistance | Extremely hard — scratch-resistant | Positive slows passive edge and surface wear; determines minimum tool hardness needed for sharpening. Negative = rapid surface degradation from regular contact. |
| `magnetism` | Diamagnetic — actively repels magnetic fields | Non-magnetic | Strongly ferromagnetic | Positive → attracted to magnetic traps, compass interference, bonus damage from magnet-based attacks. Negative = magnetic repulsion, minor bonus against those same threats. |
| `luminosity` | Light-absorbing — darkens ambient light in its vicinity | No emission | Bright passive emission | Positive provides a light radius but breaks stealth in darkness. Negative creates a subtle darkness aura — minor stealth bonus in dark environments, unsettling to some NPCs. |
| `elasticity` | Fully inelastic — absorbs impact energy but never returns it | Normal rebound behavior | Springs back immediately after any deformation | Positive → armor returns to shape after hits, reduces permanent `coverage` loss from `malleability`. Negative = deformation is absorbed but stays, accelerating permanent shape loss. |

---

### Durability

**Applies to:** weapons, throwables, armors, artifacts, rings

| Property | Type | Description | Influence |
|---|---|---|---|
| `durability` | number | Current durability (HP of the item) | At 0, item transitions to the next `condition` state. At `broken`, item is unusable. |
| `durabilityMax` | number | Maximum durability at full condition | Set by tier (weapons) or material + tier (armors). Degrades permanently when brittleness fractures occur. |
| `degradable` | boolean | Whether this item degrades at all | `false` for indestructible artifacts. |
| `condition` | enum | Derived state: `pristine` `good` `worn` `damaged` `broken` | Computed from `durability / durabilityMax`. All base stats scale down as condition drops. |
| `repairability` | 0–1 | How well it responds to repair attempts | Low → requires a master craftsman or rare materials. High → can be field-repaired with basic tools. |

**Degradation is triggered by:**
- Regular use (each attack or hit received)
- Climate exposure (`corrosion × humidity × elapsed ticks`)
- Critical impacts (`brittleness × incoming force`)
- Liquid contact (`porosity × liquid acidity × duration`)
- Prolonged storage in poor conditions

---

### Effects System

**Applies to:** weapons (on-hit), armors (on-equip / on-hit-received), edibles, potions, scrolls, throwables (on-impact), artifacts, rings

```json
{
  "id": "poison",
  "magnitude": 5,
  "duration": 10,
  "chance": 0.15,
  "target": "enemy"
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | References an effect definition |
| `magnitude` | number | Damage per tick, stat change amount, heal value, or multiplier depending on effect type |
| `duration` | number (ticks) | How long the effect persists. `0` = instant or permanent while active. |
| `chance` | 0–1 | Probability of triggering. `1.0` = always. |
| `target` | enum | `self` `enemy` `area` `contents` |
| `hook` | enum | `onEquip` `onUnequip` `onHit` `onHitReceived` `onUse` `onExpire` `aura` |

**Target: `contents`** — applies the effect to all items currently stored inside this carrier. Used exclusively on carriers. Magnitude is typically a multiplier (`1.25` = 25% boost) or a full-protection flag (`1.0`).

**Effect trigger hooks:**

| Hook | Description |
|---|---|
| `onEquip` | Fires when item is worn or held |
| `onUnequip` | Fires when item is removed |
| `onHit` | Fires when this item strikes a target |
| `onHitReceived` | Fires when the wearer takes a hit |
| `onUse` | Fires on active use or consumption |
| `onExpire` | Fires when item expires, breaks, or is destroyed |
| `aura` | Persistent passive area effect while equipped |

---

### Expiry / Perishability

**Applies to:** potions, ingredients

| Property | Type | Description | Influence |
|---|---|---|---|
| `perishable` | boolean | Whether this item can expire at all | Non-perishable items ignore all expiry properties. |
| `shelfLife` | number (ticks) | Time until spoiled at room temperature | Countdown starts from creation or pickup. |
| `spoilage` | 0–1 | Daily decay rate | Modified by storage temperature, container insulation, climate humidity. |
| `spoiledId` | string? | Item ID of the spoiled form | `null` = item is destroyed. e.g. potion → `inert_vial`. |
| `refrigeratable` | boolean | Cold storage slows spoilage | Storing in an insulated container in a cold climate reduces `spoilage` rate. |
| `preservable` | boolean | Can be processed to extend life | Unlocks a crafting recipe for a preserved variant with no expiry. |

*Edibles use a simplified expiry model — see the Edibles section.*

---

### Container Properties

**Applies to:** bags, carriers

| Property | Type | Description | Influence |
|---|---|---|---|
| `slots` | integer | Number of item slots | Each item or stack occupies one slot. |
| `weightCapacity` | number (kg) | Max carry weight | Exceeding this applies an overweight penalty to speed and stamina. Carrying beyond hard cap is impossible. |
| `allowedTypes` | string[]? | Carriers only — restricts to specific item types | e.g. `["ammo"]` for a quiver. `null` = accepts anything. |
| `allowedTags` | string[]? | Carriers only — restricts by item tag | e.g. `["potion"]` for a potion belt. Enables slot efficiency over a standard bag. |
| `expandable` | boolean | Slots or capacity can be upgraded | Via crafting, enchantment, or merchant. |
| `waterproof` | boolean | Protects contents from moisture | Prevents humidity from contributing to corrosion of stored items. |
| `padded` | boolean | Absorbs impact for stored contents | Reduces durability damage to fragile items (scrolls, potions, glass) from falls or combat. |
| `insulated` | boolean | Maintains temperature of contents | Keeps food and potions at stable temperature — slows spoilage, preserves temperature-sensitive effects. |
| `organized` | 0–1 | Item retrieval efficiency | Higher = faster access in combat (reduces action delay when swapping or consuming items mid-fight). |
| `lockable` | boolean | Has a lock mechanism | Resists pickpocket and unauthorized looting. |
| `weight` | number (g) | Empty weight of the container itself | Always added to total carry weight. |

---

## Item-Type Specific Properties

---

### Bags

The player's primary inventory. Bags occupy a carry slot on the character.

*Uses all Container Properties above.*

| Property | Type | Description |
|---|---|---|
| `wearPosition` | enum | Where it is worn: `belt` `shoulder` `back` `crossbody` `hand` |
| `durability` | number? | Some bags can wear out over time, losing slots when broken |
| `durabilityMax` | number? | |

---

### Carriers

Sub-inventories that sit inside a bag and consolidate a specific item type into one bag slot, saving space.

*Uses all Container Properties above. Carriers always have `allowedTypes` or `allowedTags` set.*

| Property | Type | Description |
|---|---|---|
| `unique` | boolean | Only one of this carrier can be owned at a time. Attempting to acquire a second is blocked. All carriers are `true`. |
| `occupiedSlots` | integer | How many bag slots this carrier itself takes up. Always `1` — the efficiency comes from what it holds internally. |
| `quickAccess` | boolean | Items in this carrier can be used directly without removing the carrier from the bag. |
| `acquiredFrom` | string[] | Where this carrier can be obtained. Values: `"shop"`, `"merchant"`. |
| `stackLimitPerType` | integer \| null | Max items per type that can stack within this carrier. `null` = defer to the item's own `stackMax`. Omit if the carrier does not allow stacking. |
| `mergeable` | boolean | Items in this carrier can be merged to compress slots (e.g. two small potions → one medium). Requires items to define `mergeTier`. |
| `mergeTiers` | string[] | Ordered merge progression. e.g. `["small", "medium", "great"]`. Two of tier N merge into one of tier N+1. |
| `effectMode` | enum | How effects from stored items are combined when the carrier itself is equipped. `"average"` = all stored item effects are averaged into one. Only relevant for ring-type carriers. |
| `equipSlot` | string? | If set, this carrier is worn as equipment rather than stored in a bag. Value matches a character equipment slot (e.g. `"ring"`). |

---

### Weapons

| Property | Type | Description | Influence |
|---|---|---|---|
| `tier` | 1–10 | Craftsmanship tier | Scales base stats and value; determines `durabilityMax` base |
| `damage` | number | Base damage value | Scaled by `edge` and current `condition` |
| `damageType` | enum[] | `slash` `pierce` `blunt` `elemental` `true` | Determines armor interaction and enemy resistances |
| `speed` | 0–2 | Attack speed multiplier | Affects attacks per turn and combo potential |
| `edge` | 0–2 | Sharpness and penetration | Bonus to piercing/slashing damage; naturally degrades as durability drops |
| `reach` | 0–2 | Attack range | Determines tile reach and safe engagement distance |
| `grip` | 1–2 | Handedness: `1` = one-handed, `2` = two-handed | Occupies one or both hand slots. Shields can always be co-equipped regardless of grip. |
| `familyFlag` | bitmask | Weapon family / category | Controls ammo compatibility, skill unlocks, AI behavior |
| `parryRating` | 0–1 | Defensive parry capability | Reduces incoming damage when actively parrying |
| `blockRating` | 0–1 | Damage blocked when actively blocking | Shields high; daggers low |
| `critChance` | 0–1 | Base critical hit chance | Stacks additively with character stats |
| `critMultiplier` | number | Damage multiplier on crit | Default `2.0` |
| `staminaCost` | number | Stamina consumed per swing | Scales with weight and grip |
| `sharpnable` | boolean | Can be honed with a sharpening stone | Temporarily boosts `edge` above base for a duration |
| `enchantable` | boolean | Can receive enchantments | |
| `soulbound` | boolean | Binds to character on equip | Cannot be traded or dropped while soulbound |

*Also uses: Durability, Effects System*

---

### Throwables

All weapon properties apply, plus:

| Property | Type | Description | Influence |
|---|---|---|---|
| `curvature` | 0–2 | Arc or curve of flight path | Higher = more curved trajectory (bolas, boomerangs, curved blades) |
| `returnTo` | boolean | Returns to the thrower if it misses or completes arc | Boomerang behavior |
| `aoe` | number (m) | Area of effect radius on impact | `0` = single target only |
| `fuseTime` | number? | Delay in ticks before detonation | For explosive throwables. `null` = immediate impact. |
| `splashEffect` | string? | Substance applied to the ground or targets on impact | References an effect ID — oil, acid, frost, etc. |
| `bounces` | integer | Number of ricochets before coming to rest | `0` = no bounce |
| `stackMax` | integer | Max stack size | Most throwables are stackable |
| `recoverable` | boolean | Can be retrieved from the ground after use | Throwing knives: yes. Clay pots: no. |

*Also uses: Durability, Effects System*

---

### Ammo

| Property | Type | Description | Influence |
|---|---|---|---|
| `weight` | number (g) | Weight per round / per projectile | Contributes to quiver or carrier weight |
| `compatibleFamilyFlag` | bitmask | Weapon families that accept this ammo | |
| `weaponAmplifiers` | object | Per-weapon-type damage multipliers | e.g. `{ "longbow": 1.12, "composite_bow": 1.4 }` |
| `penetration` | 0–1 | Armor penetration | Bypasses a percentage of the target's armor protection value |
| `damageTypeOverride` | enum? | Overrides the weapon's damage type | Fire arrows turn a piercing attack into fire damage |
| `specialEffect` | string? | On-hit effect applied on impact | References an effect ID — poison, bleed, frost, etc. |
| `tracerVisible` | boolean | Reveals shooter position to enemies on hit | Relevant for stealth builds |
| `recoverable` | boolean | Can be retrieved after use | Arrows: yes. Bullets: no. |
| `stackMax` | integer | Max stack size | Bullets: 200+. Arrows: 20–40. |
| `velocity` | 0–1 | Relative projectile speed | Affects hit chance at long range and dodge difficulty |

---

### Armors

Subtypes: `helm` `chest` `leggings` `boots`

| Property | Type | Description | Influence |
|---|---|---|---|
| `type` | enum | `helm` `chest` `leggings` `boots` | Determines which body slot it occupies |
| `material` | string | Reference to material definition | Source of all material properties |
| `protection` | number | Base damage reduction | Scales down proportionally as `condition` degrades |
| `coverage` | 0–1 | Fraction of body part covered | Affects hit-location damage calculations — low coverage = gaps that can be targeted |
| `mobility` | 0–1 | Movement speed modifier | Heavy armor penalizes speed and dodge |
| `encumbrance` | 0–1 | Stamina drain rate modifier | Higher = more stamina cost per action while worn |
| `resistances` | object | Elemental damage resistances | `{ "fire": 0.3, "lightning": 0.1, "poison": 0.0 }` |
| `layerable` | boolean | Can be worn under other armor pieces | Padded gambeson under chainmail, for example |
| `stealthPenalty` | 0–1 | Direct penalty to stealth score | Derived from `acoustics` + weight, but exposed as its own modifier for override |
| `setId` | string? | Part of an armor set | Equipping all pieces in a set triggers bonus effects |
| `qualityMultipliers` | object | Per-property deviations from material base | |

*Also uses: Material Properties, Durability, Effects System*

---

### Edibles

Subtypes: `food`, `beverage`

#### Core qualities

| Property | Type | Description | Influence |
|---|---|---|---|
| `satiation` | number | How much hunger is restored on consumption | Fills the hunger meter. Higher = more filling. |
| `effects` | Effect[] | Buffs or debuffs applied on consumption | Use the Effects System format with `hook: "onUse"`. Can be positive (stamina boost, heal) or negative (food poison). |
| `decay` | number (actions) | How many player actions before the item rots | When the counter reaches 0, the item is prefixed with `rotten_` and a `[Rotten]` label is applied. No new item is created. |

#### Additional properties

| Property | Type | Description | Influence |
|---|---|---|---|
| `subtype` | enum | `food` `beverage` | Affects carrier compatibility and some race interactions. |
| `requiresCooking` | boolean | Must be cooked before it is safe to consume | If consumed raw, `effects` apply regardless (typically `food_poison`). Use alongside `cookedFormId`. |
| `cookedFormId` | string? | Item ID of the cooked form | Produced by cooking this item at a fire or cooking station. |
| `refrigeratable` | boolean | Cold effects reset the `decay` counter | Applies when a chilling potion, cold aura, or cold environment is in contact with the item. |

---

### Resources

Raw materials gathered or looted from the world.

| Property | Type | Description | Influence |
|---|---|---|---|
| `purity` | 0–1 | Quality of raw material | Affects output quality and quantity when refined — low purity ore yields fewer ingots |
| `hardness` | 0–1 | Surface hardness | Determines which tools can mine or process it. Cannot sharpen on something softer than the blade. |
| `refinable` | boolean | Can be smelted, cut, or otherwise processed | |
| `refinedFormId` | string? | Item ID of the processed output | e.g. `iron_ore` → `iron_ingot` |
| `yieldRate` | 0–1 | Conversion efficiency | `0.7` = 70% of input mass becomes usable output |
| `sourceType` | enum | `mined` `harvested` `looted` `crafted` `traded` | Affects spawn location logic and economy behavior |
| `flammable` | boolean | Can be used as fuel | |
| `fuelValue` | number? | Burn duration as fuel in ticks | Relevant for crafting stations and survival mechanics |
| `stackMax` | integer | Max stack size | |


---

### Ingredients

Crafting or alchemy components. More reactive and perishable than raw resources.

| Property | Type | Description | Influence |
|---|---|---|---|
| `potency` | 0–1 | Contribution strength in a recipe | Higher = stronger output effect from this ingredient |
| `solubility` | 0–1 | How cleanly it dissolves in liquid | High = mixes without residue; low = cloudy, reduced concentration |
| `volatility` | 0–1 | Stability during crafting | High = chance of failure, degraded output, or explosion |
| `catalytic` | boolean \| number | Amplifies other ingredients | Does not contribute its own effect; multiplies the potency of neighboring ingredients |
| `contraindications` | string[] | Ingredient IDs that react badly with this | Combining these produces dangerous or negative results |
| `synergies` | string[] | Ingredient IDs that enhance this one | Bonus potency or unlocked effects when combined |
| `school` | enum | `alchemy` `cooking` `enchanting` `herbalism` etc. | Determines valid crafting stations and skill bonuses |
| `freshness` | 0–1 | Current quality — degrades over time | Reduces effective `potency` as freshness drops |
| `perishable` | boolean | | |
| `shelfLife` | number | | |
| `spoilage` | 0–1 | | |
| `stackMax` | integer | | |

---

### Scrolls

Single-use or limited-charge magical texts.

| Property | Type | Description | Influence |
|---|---|---|---|
| `spellId` | string | The spell this scroll contains | References the spell definition |
| `school` | enum | `fire` `ice` `arcane` `holy` `dark` `nature` `time` etc. | Affects resistance interactions and spell skill bonuses |
| `charges` | integer | Uses before the scroll is consumed | Most scrolls are single-use (`1`) |
| `castTime` | number (ticks) | Activation delay | Longer = more vulnerable during cast |
| `intelligenceRequirement` | number? | Min INT to read without misfire | Below this threshold, `failChance` is non-zero |
| `failChance` | 0–1 | Chance of misfire at minimum INT | Scales down as INT exceeds requirement |
| `cursed` | boolean | Activates a negative effect instead of the intended one | Not identifiable until used, unless the scroll is appraised |
| `learnOnUse` | boolean | Teaches the spell permanently to the caster | Rare scrolls — consumed on use but spell is added to the character's known spells |
| `fragile` | boolean | Can be destroyed by water, fire, or rough handling | Water-damaged scrolls fail on use; fire destroys them entirely |
| `singleUse` | boolean | Destroyed on first use regardless of charges | |
| `effects` | Effect[] | What happens on successful cast | |

---

### Potions

Drinkable magical or alchemical concoctions.

| Property | Type | Description | Influence |
|---|---|---|---|
| `volume` | number (ml) | Liquid volume | Affects total weight and serving count |
| `concentration` | 0–1 | Potency multiplier | Higher = stronger effect but shorter shelf life |
| `servings` | integer | Doses per container | |
| `onset` | number (ticks) | Delay before effect activates | Fast potions: `0`. Slow-release: `10+` |
| `duration` | number (ticks) | How long the effect lasts | |
| `school` | enum | `healing` `mana` `stamina` `buff` `debuff` `poison` `antidote` `transmutation` etc. | |
| `effects` | Effect[] | Applied on consumption | |
| `mixable` | boolean | Can be combined with other potions | Enables a potion-mixing crafting system |
| `volatile` | boolean | Can explode if struck while in inventory | Chance based on incoming force and `ignitability` of container |
| `viscosity` | 0–1 | Thickness of the liquid | High = slower `onset`, longer `duration` |
| `containerType` | enum | `vial` `flask` `bottle` `jug` | Affects stack size, break chance, and pour behavior |
| `cursed` | boolean | Effect is harmful despite appearance | |
| `perishable` | boolean | | |
| `shelfLife` | number | | |
| `spoilage` | 0–1 | | |
| `spoiledId` | string? | e.g. potion → `inert_vial` or `rancid_mixture` | |

---

### Artifacts

Powerful and often unique items with exceptional properties.

| Property | Type | Description | Influence |
|---|---|---|---|
| `unique` | boolean | Only one instance exists in the world at a time | |
| `lore` | string | Deep backstory and provenance | |
| `equippableSlot` | enum? | Which character slot it occupies | `weapon` `ring` `neck` `offhand` `relic` etc. |
| `cursed` | boolean | Cannot be unequipped without a specific ritual | |
| `charges` | integer? | Uses of active ability. `null` = passive only | |
| `setId` | string? | Part of a named artifact set | Equipping all items in the set triggers unique bonus effects |
| `awakened` | boolean | Has an awakened state with additional power | |
| `awakeningCondition` | string? | What triggers awakening | e.g. `"kill_100_enemies"` or `"reach_tier_5"` |
| `soulbound` | boolean | Binds to the character on equip or pickup | Cannot be traded, dropped, or stored once bound |
| `sentient` | boolean | Has its own will or can communicate | Opens unique dialogue; may resist being stored or wielded by an unworthy character |
| `alignment` | enum? | `good` `neutral` `evil` | Affects usability by certain classes or morality scores |
| `effects` | Effect[] | Passive effects while held or worn | |
| `onEquip` | Effect[] | | |
| `onHit` | Effect[] | | |
| `durability` | number? | `null` = indestructible | |
| `durabilityMax` | number? | | |

*Also uses: Effects System*

---

### Rings

Wearable accessories occupying the finger slots.

| Property | Type | Description | Influence |
|---|---|---|---|
| `enchantments` | object[] | Magical stat bonuses applied while worn | |
| `effects` | Effect[] | Passive effects active while equipped | |
| `cursed` | boolean | Cannot be removed without a curse-break item or ritual | |
| `soulbound` | boolean | Binds to the character on equip | |
| `setId` | string? | Part of a ring set | Wearing multiple rings from the same set triggers bonus effects |
| `socketable` | boolean | Can accept a gem or rune | |
| `socketedItemId` | string? | ID of currently socketed gem or rune | |
| `charges` | integer? | Uses of an active ability | `null` = passive only |
| `fingerSlot` | enum? | `thumb` `index` `middle` `ring` `pinky` | Some ring effects are finger-specific |
| `durability` | number? | Most rings are durable — brittle rings (bone, crystal) can shatter | |
| `durabilityMax` | number? | | |

*Also uses: Durability, Effects System*

---

## Property Cross-Reference

Quick lookup: which shared groups each item type uses.

| Item Type | Material | Durability | Effects | Expiry | Container |
|---|:---:|:---:|:---:|:---:|:---:|
| Bags | — | optional | — | — | ✓ |
| Carriers | — | — | — | — | ✓ |
| Weapons | — | ✓ | ✓ | — | — |
| Throwables | — | ✓ | ✓ | — | — |
| Ammo | — | — | ✓ | — | — |
| Armors | ✓ | ✓ | ✓ | — | — |
| Edibles | — | — | ✓ | ✓ | — |
| Resources | — | — | — | — | — |
| Ingredients | — | — | — | ✓ | — |
| Scrolls | — | optional | ✓ | — | — |
| Potions | — | — | ✓ | ✓ | — |
| Artifacts | — | optional | ✓ | — | — |
| Rings | — | optional | ✓ | — | — |
