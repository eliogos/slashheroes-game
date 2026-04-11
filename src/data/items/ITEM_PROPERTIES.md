# Item Properties Reference

*Reference for item definitions in `src/data/items`.*

## Canonical display model

Each item uses the same nested display object:

```ts
export interface ItemDisplayEntry {
  name: string;
  description: string;
  plural?: string;
}

export type ItemDisplay = {
  en: ItemDisplayEntry;
} & Record<string, ItemDisplayEntry>;
```

**Read item copy from:**
- `item.display.en.name`
- `item.display.en.description`
- `item.display.en.plural` *(optional)*

## Minimal shared shape

All item definitions share this base:

```ts
type BaseItemLike = {
  internalId: number;
  id: string;
  display: ItemDisplay;
  created_at: string;
  archived?: boolean;
};
```

## Unit reference

Use these badge-style labels as quick reading guides when balancing or naming fields:

| Badge | Value | Reference unit | Notes |
|---|---|---|---|
| <img alt="mass g" src="https://img.shields.io/badge/mass-g-6f42c1?style=flat-square" /> | `qualities.weight`, `baseWeight` | grams (`g`) | Inventory / material mass reference |
| <img alt="volume mL" src="https://img.shields.io/badge/volume-mL-1f6feb?style=flat-square" /> | `volume` | milliliters (`mL`) | Potion container volume |
| <img alt="energy kcal" src="https://img.shields.io/badge/energy-kcal-d29922?style=flat-square" /> | `energy` | kilocalories (`kcal`) | Food energy reference |
| <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | `duration`, `onset`, `castTime`, `shelfLife` | ticks | Time-based gameplay pacing |
| <img alt="time actions" src="https://img.shields.io/badge/time-actions-2da44e?style=flat-square" /> | `decay`, `decayAction` | actions | Food freshness / spoilage pacing |
| <img alt="ratio 0-1" src="https://img.shields.io/badge/ratio-0--1-f85149?style=flat-square" /> | `chance`, `failChance` | normalized ratio (`0.0–1.0`) | Read as 0% to 100% |
| <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | `concentration`, `viscosity`, multipliers | scalar / ratio | Balance-facing values rather than hard physical simulation |
| <img alt="class enum" src="https://img.shields.io/badge/class-enum-57606a?style=flat-square" /> | `familyFlag`, subtype ids | enum / bitmask | Semantic classification values |

<sub>
Notes: units in this page are mainly for semantics, balancing readability, and semi-realistic flavor. They are reference-facing gameplay values, not strict real-world simulation guarantees.
</sub>

<br>

> **Defined unit** = the authoring/input unit written in the data file. **Finalized unit** = the resolved gameplay unit after helper conversion, normalization, or derived calculation. Leave both blank when a field is semantic-only.

<br>

## Item modules at a glance

<table>
  <thead>
    <tr>
      <th>Module</th>
      <th>Definition</th>
      <th>Purpose</th>
      <th>Main extra fields</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Weapons</b></td>
      <td><code>WeaponDefinition</code></td>
      <td>Melee / ranged combat entries resolved by family flags and quality multipliers.</td>
      <td><code>tier</code>, <code>grip</code>, <code>qualityMultipliers</code>, <code>familyFlag</code>, <code>effect</code></td>
    </tr>
    <tr>
      <td><b>Ammo</b></td>
      <td><code>AmmoDefinition</code></td>
      <td>Projectile or charge inputs for compatible weapon families.</td>
      <td><code>qualities</code>, <code>compatibleFamilyFlag</code>, <code>weaponAmplifiers</code></td>
    </tr>
    <tr>
      <td><b>Armors</b></td>
      <td><code>ArmorDefinition</code></td>
      <td>Slot-based protection resolved from material configs.</td>
      <td><code>type</code>, <code>material</code>, <code>qualityMultipliers</code></td>
    </tr>
    <tr>
      <td><b>Carriers</b></td>
      <td><code>CarrierDefinition</code></td>
      <td>Specialized containers that organize specific item groups.</td>
      <td><code>allowedTypes</code>, <code>allowedTags</code>, <code>slots</code>, <code>effects</code></td>
    </tr>
    <tr>
      <td><b>Edibles</b></td>
      <td><code>EdibleDefinition</code></td>
      <td>Food and drink with hunger, cooking, and spoilage behavior.</td>
      <td><code>energy</code>, <code>satiationType</code>, <code>decay</code>, <code>spoilageState</code></td>
    </tr>
    <tr>
      <td><b>Potions</b></td>
      <td><code>PotionDefinition</code></td>
      <td>Drinkable alchemy items with onset, duration, and shelf-life data.</td>
      <td><code>volume</code>, <code>concentration</code>, <code>duration</code>, <code>perishable</code></td>
    </tr>
    <tr>
      <td><b>Scrolls</b></td>
      <td><code>ScrollDefinition</code></td>
      <td>Spell-bearing paper items with charges and casting requirements.</td>
      <td><code>spellId</code>, <code>school</code>, <code>charges</code>, <code>failChance</code></td>
    </tr>
  </tbody>
</table>

## Shared support structures

### Effect payloads

Item modules use two effect shapes:

| Shape | Used by | Fields |
|---|---|---|
| `WeaponDefinition.effect` | weapons | `Record<string, unknown> \| null` |
| `CarrierEffect`, `EdibleEffect`, `PotionEffect`, `ScrollEffect` | carriers, edibles, potions, scrolls | `hook`, `id`, `target`, `magnitude`, `duration`, `chance` |

### Active entries

Every module also exposes an `Active*Definition` alias that means:

```ts
type ActiveXDefinition = XDefinition & { archived?: false | undefined };
```

Only non-archived entries are included in active runtime lists.

## Weapons

Weapons are combat items used to attack, pressure, or control targets. Their identity comes from family flags, tier scaling, and quality multipliers that resolve into the final handling profile.

Source: `src/data/items/weapons/helpers/types.ts`

```ts
interface WeaponDefinition {
  internalId: number;
  id: string;
  display: ItemDisplay;
  tier: number;
  grip: 0 | 1 | 2;
  qualityMultipliers: WeaponQualityMultipliers;
  familyFlag: number;
  effect: Record<string, unknown> | null;
  created_at: string;
  archived?: boolean;
}
```

### Weapon fields

| Field | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `tier` | `number` |  |  | Power / progression tier used during stat resolution |
| `grip` | `0 \| 1 \| 2` |  |  | `0` = throwable handling, `1` = one-handed, `2` = two-handed |
| `qualityMultipliers` | object |  |  | Per-item adjustment against family base qualities |
| `familyFlag` | `number` |  |  | Bitmask of one or more weapon families |
| `effect` | `Record<string, unknown> \| null` |  |  | Optional special behavior payload |

### `WeaponQualityMultipliers`

| Key | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `weight` | `number?` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | <img alt="mass g" src="https://img.shields.io/badge/mass-g-6f42c1?style=flat-square" /> | Heavier / lighter than family base |
| `speed` | `number?` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | <img alt="speed m/s" src="https://img.shields.io/badge/speed-m%2Fs-1f6feb?style=flat-square" /> | Faster / slower than family base |
| `edge` | `number?` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | <img alt="edge mm" src="https://img.shields.io/badge/edge-mm-0969da?style=flat-square" /> | Sharper / duller than family base |
| `reach` | `number?` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | <img alt="reach cm" src="https://img.shields.io/badge/reach-cm-0a7ea4?style=flat-square" /> | Shorter / longer than family base |
| `curvature` | `number?` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | <img alt="angle rad" src="https://img.shields.io/badge/angle-rad-bd561d?style=flat-square" /> | Straighter / more curved than family base |

### Weapon family flags

<p>
  <code>AXE</code>
  <code>BATTERY</code>
  <code>BLADE</code>
  <code>BLUNT</code>
  <code>CURVED_BLADE</code>
  <code>FIREARM</code>
  <code>FIST</code>
  <code>KNIFE</code>
  <code>LEGENDARY</code>
  <code>MISC</code>
  <code>POLEARM</code>
  <code>PROJECTILE</code>
  <code>RANGED</code>
  <code>SHIELD</code>
  <code>STAFF</code>
  <code>TOOL</code>
  <code>THROWABLE</code>
</p>

A weapon can belong to **multiple families at once**.

### Derived quality formula

In the resolver, final family-based qualities are computed from family averages and item multipliers:

$$
Q_{\text{resolved}} = \operatorname{avg}(Q_{\text{families}}) \times M_{\text{item}}
$$

Throwables then receive the base bonus:

$$
\text{reach} \leftarrow \text{reach} + 40,\qquad
\text{curvature} \leftarrow \text{curvature} + \frac{\pi}{18}
$$

## Ammo

Ammo represents consumable projectiles, charges, or rounds used by compatible weapon families. It mainly adjusts delivery weight and weapon-specific output through compatibility and amplifier data.

Source: `src/data/items/ammo/types.ts`

```ts
interface AmmoDefinition {
  internalId: number;
  id: string;
  display: ItemDisplay;
  qualities: { weight: number };
  compatibleFamilyFlag: number;
  weaponAmplifiers: Record<string, number>;
  created_at: string;
  archived?: boolean;
}
```

### Ammo fields

| Field | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `qualities.weight` | `number` | <img alt="mass g" src="https://img.shields.io/badge/mass-g-6f42c1?style=flat-square" /> | <img alt="mass g" src="https://img.shields.io/badge/mass-g-6f42c1?style=flat-square" /> | Projectile or round mass in grams |
| `compatibleFamilyFlag` | `number` |  |  | Bitmask of weapon families that can consume this ammo |
| `weaponAmplifiers` | `Record<string, number>` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | Per-weapon multiplier overrides by weapon id |

> Ammo weight lives in `qualities.weight`, not at top level.

## Armors

Armors are wearable protection pieces tied to a body slot and a material profile. Their final defensive identity is resolved from slot type, material properties, and quality scaling.

Source: `src/data/items/armors/types.ts`

```ts
interface ArmorDefinition {
  internalId: number;
  id: string;
  type: 'helm' | 'chest' | 'leggings' | 'boots';
  material: ArmorMaterialId;
  display: ItemDisplay;
  qualityMultipliers: { protection: number };
  created_at: string;
  archived?: boolean;
}
```

### Armor fields

| Field | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `type` | `helm \| chest \| leggings \| boots` |  |  | Equipped slot |
| `material` | `ArmorMaterialId` |  |  | Material key used to resolve the armor’s stat profile |
| `qualityMultipliers.protection` | `number` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | <img alt="stat pts" src="https://img.shields.io/badge/stat-pts-9a6700?style=flat-square" /> | Craftsmanship / quality scale on resolved protection output |

<details>
<summary><b>Armor material ids</b></summary>
<p>
  <code>paper</code>
  <code>bread</code>
  <code>cardboard</code>
  <code>fabric</code>
  <code>seashells</code>
  <code>bone</code>
  <code>leather</code>
  <code>wood</code>
  <code>scales</code>
  <code>chainmail</code>
  <code>ironplate</code>
  <code>obsidian</code>
  <code>kevlar</code>
  <code>diamondplate</code>
</p>
</details>

### Related armor support data

**`ArmorMaterialDefinition`** powers the armor resolver and contains:

- `id`
- `displayName`
- `description`
- `types.helm.yieldStress`
- `types.chest.thickness`
- `types.chest.hardness`
- `types.leggings.elasticity`
- `types.boots.tractionCoefficient`
- `baseWeight`
- `variance`

**`ArmorTypeDefinition`** describes each slot and links it to the resolved stat:

| Slot | Resolved stat |
|---|---|
| `helm` | `critInfluence` |
| `chest` | `defense` |
| `leggings` | `evasion` |
| `boots` | `stride` |

### Armor resolution formula

The armor resolver is material-driven. At a high level:

$$
\text{baseStat} = f(\text{material}, \text{slot}) \times \text{qualityMultipliers.protection}
$$

$$
\text{spread} = \text{baseStat} \times \text{variance}
$$

So the displayed output is effectively a resolved range: `base ± spread`.

## Carriers

Carriers are utility storage items that organize, restrict, and sometimes enhance groups of contained items. They function like specialized sub-inventories with capacity, access, and filtering rules.

Source: `src/data/items/carriers/helpers/types.ts`

```ts
interface CarrierDefinition {
  internalId: number;
  id: string;
  display: ItemDisplay;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'unique';
  unique: boolean;
  stackable: boolean;
  occupiedSlots: number;
  quickAccess: boolean;
  allowedTypes: string[] | null;
  allowedTags: string[] | null;
  slots: number | null;
  stackLimitPerType: number | null;
  mergeable: boolean;
  mergeTiers: string[];
  effectMode: string | null;
  equipSlot: string | null;
  acquiredFrom: string[];
  effects: CarrierEffect[];
  padded?: boolean;
  waterproof?: boolean;
  insulated?: boolean;
  lockable?: boolean;
  created_at: string;
  archived?: boolean;
}
```

### Carrier fields

| Field | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `rarity` | enum |  |  | Carrier rarity label |
| `unique` | `boolean` |  |  | Whether only one should exist per owner |
| `stackable` | `boolean` |  |  | Whether the carrier item itself stacks |
| `occupiedSlots` | `number` | `slots` | `inventory slots` | Inventory slots consumed by the carrier |
| `quickAccess` | `boolean` |  |  | Allows direct use from the carrier |
| `allowedTypes` | `string[] \| null` |  |  | Accepted item types |
| `allowedTags` | `string[] \| null` |  |  | Accepted item tags / labels |
| `slots` | `number \| null` | `slots` | `internal slots` | Internal capacity |
| `stackLimitPerType` | `number \| null` | `count` | `count` | Per-type stacking override |
| `mergeable` | `boolean` |  |  | Whether stored items can merge up |
| `mergeTiers` | `string[]` |  |  | Ordered merge chain |
| `effectMode` | `string \| null` |  |  | How contained effects are combined |
| `equipSlot` | `string \| null` |  |  | If worn rather than carried |
| `acquiredFrom` | `string[]` |  |  | Allowed acquisition sources |
| `effects` | `CarrierEffect[]` |  |  | Passive or container-targeted carrier effects |
| `padded`, `waterproof`, `insulated`, `lockable` | `boolean?` |  |  | Optional storage protection flags |

## Edibles

Edibles are food and drink consumables that primarily interact with hunger, freshness, cooking, and spoilage. They can also apply direct use effects through their effect payloads.

Source: `src/data/items/edibles/helpers/types.ts`

```ts
interface EdibleDefinition {
  internalId: number;
  id: string;
  display: ItemDisplay;
  rarity: string;
  stackable: number;
  subtype: EdibleSubtype;
  energy: number;
  satiationType: SatiationType;
  form: string;
  requiresCooking: boolean;
  cookedFormId: string | null;
  refrigeratable: boolean;
  decay: number;
  decayAction: number;
  spoilageState: SpoilageState;
  effects: EdibleEffect[];
  created_at: string;
  archived?: boolean;
}
```

### Edible fields

| Field | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `rarity` | `string` |  |  | Rarity label |
| `stackable` | `number` | `count` | `count` | Max stack size |
| `subtype` | `EdibleSubtype` |  |  | Numeric edible category id |
| `energy` | `number` | <img alt="energy kcal" src="https://img.shields.io/badge/energy-kcal-d29922?style=flat-square" /> | <img alt="hunger pts" src="https://img.shields.io/badge/hunger-pts-2da44e?style=flat-square" /> | Food energy in kilocalories |
| `satiationType` | `SatiationType` |  |  | Distribution behavior for hunger restoration |
| `form` | `string` |  |  | Variant label such as `raw`, `cooked`, `glazed` |
| `requiresCooking` | `boolean` |  |  | Whether the item should be cooked first |
| `cookedFormId` | `string \| null` |  |  | Target id after cooking |
| `refrigeratable` | `boolean` |  |  | Whether cold storage helps preserve it |
| `decay` | `number` | <img alt="time actions" src="https://img.shields.io/badge/time-actions-2da44e?style=flat-square" /> | spoilage budget | Total freshness budget in actions |
| `decayAction` | `number` | <img alt="time actions" src="https://img.shields.io/badge/time-actions-2da44e?style=flat-square" /> | spoilage interval | Actions between spoilage ticks |
| `spoilageState` | `SpoilageState` |  |  | Freshness bucket |
| `effects` | `EdibleEffect[]` |  |  | On-use food effects |

### Enum ids

| Group | Values |
|---|---|
| `EDIBLE_SUBTYPE` | `1 = FOOD`, `2 = BEVERAGE` |
| `SATIATION_TYPE` | `1 = INSTANT`, `2 = STEADY`, `3 = SLOWBURN`, `4 = DELAYED`, `5 = THRESHOLD`, `6 = BUFFER`, `7 = SYNERGY`, `8 = COMBO`, `9 = BOOST` |
| `SPOILAGE_STATE` | `1 = FRESH`, `2 = AGING`, `3 = STALE`, `4 = SPOILED`, `5 = ROTTEN` |

### Satiation formula

Normalized hunger fill comes from `getBaseSatiation()`:

$$
\text{baseSatiation} = \operatorname{round}\left(
\frac{\text{energyKcal}}{\text{energyMaxKcal}} \times \text{hungerMax}
\right)
$$

### Spoilage formula

Spoilage helpers use a heat multiplier and elapsed actions:

$$
\text{heatMultiplier} =
\operatorname{clamp}\left(1 + (T - T_n)\times s,\ m_{\min},\ m_{\max}\right)
$$

$$
\text{baseSpoilage} = \text{actionsPassed} \times \text{heatMultiplier}
$$

## Potions

Potions are liquid consumables built around timed effects, concentration, and shelf life. They model dose-based use, onset timing, and possible instability or spoilage.

Source: `src/data/items/potions/helpers/types.ts`

```ts
interface PotionDefinition {
  internalId: number;
  id: string;
  display: ItemDisplay;
  rarity: string;
  stackable: number;
  subtype: string;
  volume: number;
  concentration: number;
  servings: number;
  onset: number;
  duration: number;
  school: string;
  effects: PotionEffect[];
  mixable: boolean;
  volatile: boolean;
  viscosity: number;
  containerType: string;
  cursed: boolean;
  perishable: boolean;
  shelfLife: number | null;
  spoilage: number;
  spoiledId: string | null;
  created_at: string;
  archived?: boolean;
}
```

### Potion fields

| Field | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `rarity` | `string` |  |  | Rarity label |
| `stackable` | `number` | `count` | `count` | Max stack size |
| `subtype` | `string` |  |  | Subtype label, defaulting to `potion` |
| `volume` | `number` | <img alt="volume mL" src="https://img.shields.io/badge/volume-mL-1f6feb?style=flat-square" /> | <img alt="volume mL" src="https://img.shields.io/badge/volume-mL-1f6feb?style=flat-square" /> | Liquid volume |
| `concentration` | `number` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | effect strength scale | Potency factor |
| `servings` | `number` | `count` | `uses / doses` | Number of doses |
| `onset` | `number` | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | Delay before the effect starts |
| `duration` | `number` | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | Duration after onset |
| `school` | `string` |  |  | Potion category / school |
| `effects` | `PotionEffect[]` |  |  | Applied consumption effects |
| `mixable` | `boolean` |  |  | Whether it can be combined with other potions |
| `volatile` | `boolean` |  |  | Whether it is unstable |
| `viscosity` | `number` | <img alt="scale x" src="https://img.shields.io/badge/scale-x-8250df?style=flat-square" /> | flow thickness scale | Thickness of the mixture |
| `containerType` | `string` |  |  | Container label such as `vial` |
| `cursed` | `boolean` |  |  | Whether the potion is cursed |
| `perishable` | `boolean` |  |  | Whether it can expire |
| `shelfLife` | `number \| null` | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | Lifetime before spoilage |
| `spoilage` | `number` | <img alt="ratio 0-1" src="https://img.shields.io/badge/ratio-0--1-f85149?style=flat-square" /> | decay rate scalar | Spoilage rate |
| `spoiledId` | `string \| null` |  |  | Result id after spoilage |

## Scrolls

Scrolls are spell-bearing consumables that store a castable effect in written form. They focus on activation time, charges, failure chance, and knowledge-related gating such as intelligence requirements.

Source: `src/data/items/scrolls/helpers/types.ts`

```ts
interface ScrollDefinition {
  internalId: number;
  id: string;
  display: ItemDisplay;
  rarity: string;
  stackable: number;
  subtype: string;
  spellId: string;
  school: string;
  charges: number;
  castTime: number;
  intelligenceRequirement: number | null;
  failChance: number;
  cursed: boolean;
  learnOnUse: boolean;
  fragile: boolean;
  singleUse: boolean;
  effects: ScrollEffect[];
  created_at: string;
  archived?: boolean;
}
```

### Scroll fields

| Field | Type | Defined unit | Finalized unit | Meaning |
|---|---|---|---|---|
| `rarity` | `string` |  |  | Rarity label |
| `stackable` | `number` | `count` | `count` | Max stack size |
| `subtype` | `string` |  |  | Subtype label, defaulting to `scroll` |
| `spellId` | `string` |  |  | Referenced spell id |
| `school` | `string` |  |  | Magic school |
| `charges` | `number` | `count` | `uses` | Available uses |
| `castTime` | `number` | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | <img alt="time ticks" src="https://img.shields.io/badge/time-ticks-2da44e?style=flat-square" /> | Activation time |
| `intelligenceRequirement` | `number \| null` |  |  | Optional minimum INT |
| `failChance` | `number` | <img alt="ratio 0-1" src="https://img.shields.io/badge/ratio-0--1-f85149?style=flat-square" /> | failure probability | Misfire chance |
| `cursed` | `boolean` |  |  | Whether the scroll has a harmful twist |
| `learnOnUse` | `boolean` |  |  | Whether the spell is learned permanently |
| `fragile` | `boolean` |  |  | Whether handling/environment can ruin it |
| `singleUse` | `boolean` |  |  | Whether one use consumes it immediately |
| `effects` | `ScrollEffect[]` |  |  | Scroll cast effects |

## Quick reference matrix

| Type | `display` | `rarity` | `stackable` | Effect field | Special driver |
|---|:---:|:---:|:---:|---|---|
| Weapons | ✓ | — | — | `effect` | `familyFlag`, `qualityMultipliers` |
| Ammo | ✓ | — | — | — | `compatibleFamilyFlag`, `weaponAmplifiers` |
| Armors | ✓ | — | — | — | `type`, `material`, `protection` multiplier |
| Carriers | ✓ | ✓ | boolean | `effects[]` | `allowedTypes`, `allowedTags`, `slots` |
| Edibles | ✓ | ✓ | number | `effects[]` | `energy`, `satiationType`, `decay` |
| Potions | ✓ | ✓ | number | `effects[]` | `volume`, `concentration`, `shelfLife` |
| Scrolls | ✓ | ✓ | number | `effects[]` | `spellId`, `charges`, `failChance` |



