# Weapons Wiki

Reference guide for the weapon system — fields, qualities, damage calculation, tier scaling, and weapon families.

---

## Weapon Object Fields

| Field | Type | Description |
|---|---|---|
| `internalId` | `number` | Unique numeric ID used internally |
| `id` | `string` | Unique slug in `snake_case` (e.g. `rusty_knife`) |
| `display` | `object` | Language-keyed UI copy at `display.en.{name, description, plural?}` |
| `tier` | `number` (1–10) | Craftsmanship tier. Higher = stronger and more precise via exponential scaling. |
| `grip` | `number` (1 or 2) | `1` = one-handed, `2` = two-handed |
| `familyFlag` | `number` | Bitmask of weapon families. A weapon can belong to multiple families. |
| `qualityMultipliers` | `object` | Per-quality deviations from the family base (see below) |
| `archived` | `boolean` | If `true`, excluded from active weapon lists |
| `created_at` | `string` | ISO date string |

### `qualityMultipliers` Fields

| Key | Meaning |
|---|---|
| `weight` | Multiplier applied to the family's base weight |
| `speed` | Multiplier applied to the family's base speed |
| `edge` | Multiplier applied to the family's base edge |
| `reach` | Multiplier applied to the family's base reach |
| `curvature` | Multiplier applied to the family's base curvature (optional) |

`1.0` = no deviation from family base. Values above/below 1 make the weapon heavier/lighter, faster/slower, etc. than average for its family.

---

## Weapon Qualities

These are the raw physical properties that drive damage calculation. All stored internally in SI units after conversion.

| Quality | Unit | What It Represents |
|---|---|---|
| `weight` | kg (stored as g) | Mass of the weapon. Heavier = more impact force. |
| `speed` | m/s | Swing or attack speed. Faster = more kinetic energy on impact. |
| `edge` | mm | Sharpness / edge quality. Higher = more penetration and cutting power. |
| `reach` | m (stored as cm) | Range of the weapon. Longer reach adds damage contribution and safety. |
| `curvature` | degrees (stored as radians) | Blade curvature / attack arc precision. Higher = tighter damage spread (more consistent). |

---

## Damage Calculation Pipeline

### Step 1 — Resolve family base qualities
If a weapon has multiple families (via bitmask), their base qualities are summed and averaged.

### Step 2 — Apply quality multipliers
Each quality is multiplied by the weapon's `qualityMultipliers` value for that quality.

### Step 3 — Apply tier scaling
Tier uses an exponential curve: `0.6 + t^1.4` where `t` is the tier normalized to `0–1`.

| Quality | Tier scale formula |
|---|---|
| `weight` | `0.9 + tierMult × 0.2` |
| `speed` | `0.8 + tierMult × 0.4` |
| `edge` | `0.7 + tierMult × 0.6` |
| `reach` | `0.85 + tierMult × 0.3` |
| `curvature` | `0.5 + tierMult` |

Higher tier = higher speed, edge, and curvature especially. Weight grows slightly, reach grows slightly.

### Step 4 — Normalize qualities
Each quality is divided by its maximum possible value to produce a `0–1` normalized score.

### Step 5 — Calculate base damage
```
baseDamage = (weight×0.25 + speed×0.30 + edge×0.30 + reach×0.15) × 100
```

**Damage weights:** Speed and edge matter most (30% each). Weight second (25%). Reach least (15%).

### Step 6 — Apply damage variance via curvature
```
precision = min(1, curvature × 2)         // reaches 1.0 at curvature = 0.5 rad
spread    = 0.25 × (1 − precision)        // max spread is ±25%
min       = round(baseDamage × (1 − spread))
max       = round(baseDamage × (1 + spread))
```

High curvature = tight, consistent damage. Zero curvature = ±25% random spread.

---

## Weapon Families

A weapon's `familyFlag` is a bitmask — a weapon can belong to multiple families. The flags are powers of 2 (bitwise OR them together to combine).

Each family defines base quality values. These are the "average" for that weapon type before quality multipliers and tier scaling are applied.

| Family | Flag | Weight | Speed | Edge | Reach | Curvature | Notes |
|---|---|---|---|---|---|---|---|
| `AXE` | `1` | 3.4 kg | 5.4 m/s | 14 mm | 1.1 m | 6° | Heavy, slow, strong impact, moderate randomness |
| `BATTERY` | `2` | 1.7 kg | 8.2 m/s | 8 mm | 1.0 m | 4° | Powered weapons, weak without a charge source |
| `BLADE` | `4` | 1.6 kg | 8.8 m/s | 12 mm | 1.0 m | 10° | Balanced, consistent performance |
| `BLUNT` | `8` | 4.2 kg | 4.6 m/s | 2 mm | 1.05 m | 0° | Raw force. Damage profile: weight 95%, edge 3%, reach 20%, speed 1% |
| `CURVED_BLADE` | `16` | 1.5 kg | 9.4 m/s | 13 mm | 1.0 m | 22° | Most precise family. Tightest damage spread. |
| `FIREARM` | `32` | 2.8 kg | 4.8 m/s | 1 mm | 1.2 m | 0° | Amplifies ammo power. Weak without ammunition. |
| `FIST` | `64` | 0.5 kg | 14.5 m/s | 7 mm | 0.45 m | 8° | Fastest strikes, low reach, moderate impact |
| `KNIFE` | `128` | 1.0 kg | 15.0 m/s | 12 mm | 0.8 m | 15° | Fastest weapon speed, low damage, precision scales with tier |
| `LEGENDARY` | `256` | 2.2 kg | 13.8 m/s | 18 mm | 1.3 m | 18° | Extreme stats, high performance and consistency |
| `MISC` | `512` | 1.9 kg | 7.5 m/s | 6 mm | 0.95 m | 3° | Unpredictable, mixed traits |
| `POLEARM` | `1024` | 3.1 kg | 6.3 m/s | 10 mm | 1.85 m | 0° | Longest reach. Slower swing. |
| `PROJECTILE` | `2048` | 0.7 kg | 4.2 m/s | 1 mm | 0.4 m | 0° | Amplifies loaded projectiles. Useless without them. |
| `RANGED` | `4096` | 1.2 kg | 10.0 m/s | 5 mm | 1.6 m | 12° | Flexible long-range (whips, yoyos) |
| `SHIELD` | `8192` | 4.8 kg | 4.0 m/s | 1 mm | 0.85 m | 2° | Defensive tool. Heaviest, slowest, minimal edge. Reduced damage output. |
| `STAFF` | `16384` | 2.4 kg | 6.8 m/s | 4 mm | 1.7 m | 0° | Blunt, amplified by magic users |
| `TOOL` | `32768` | 1.8 kg | 5.8 m/s | 5 mm | 0.85 m | 2° | Utility items, not combat-optimized |

### Custom Damage Profiles

Some families override the default damage weights to better reflect how they deal damage:

| Family | weight | speed | edge | reach | Notes |
|---|---|---|---|---|---|
| `BLUNT` | 0.95 | 0.01 | 0.03 | 0.20 | Almost entirely mass-driven, speed and sharpness irrelevant |
| All others | 0.25 | 0.30 | 0.30 | 0.15 | Default weights |

### Multi-Family Weapons

A weapon with `familyFlag` combining multiple families (e.g. `BLADE | KNIFE` = `4 | 128 = 132`) averages the base qualities of both families before applying multipliers and tier scaling. This allows hybrid weapon archetypes.

---

## Key Files

| File | Purpose |
|---|---|
| `src/data/items/weapons/_entries/**/*.ts` | One-file-per-weapon TypeScript definitions using `defineWeapon()` |
| `src/data/items/weapons/helpers/weaponEntries.ts` | Aggregated weapon entry registry |
| `src/data/items/weapons/helpers/familyConfigs.ts` | `WeaponFamily` class and family base quality definitions |
| `src/data/helpers/constants.js` | Damage weights, `WEAPON_FAMILY` bitmask constants, `BASE_MULTIPLIER` |
| `src/data/items/weapons/helpers/resolveFamilyQualities.ts` | Averages multi-family bases, applies quality multipliers |
| `src/data/items/weapons/helpers/tierScaling.ts` | Tier → exponential multiplier (power curve 1.4) |
| `src/data/items/weapons/helpers/normalizeQualities.ts` | Divides each quality by its max to get 0–1 range |
| `src/data/items/weapons/helpers/getBaseDamage.ts` | Weighted sum of normalized qualities × 100 |
| `src/data/items/weapons/helpers/damageVariance.ts` | Converts curvature to min/max damage range |
