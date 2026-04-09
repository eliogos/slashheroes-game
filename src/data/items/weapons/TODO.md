# Weapons TODO

## Durability wear — enemy hardness factor

### Concept

Durability represents the total impact energy (in **Joules**) a weapon can absorb before degrading. This fits the physical convention of the system — every strike is an energy exchange. The weapon transmits kinetic energy to the target, and the target pushes back. That return stress is what wears the weapon down.

**Joule** is the SI unit for energy. A swing that deals more damage represents a higher-energy impact, meaning more mutual stress on both sides. A weapon with higher durability has greater structural capacity to absorb that stress before its integrity fails.

### Wear formula

```
wear_per_hit = damage_dealt × target_hardness_factor × family_wear_coefficient
```

- `damage_dealt` — proxy for impact energy (J); harder hits = more mutual stress
- `target_hardness_factor` — resistance of the enemy's surface (see below)
- `family_wear_coefficient` — how structurally fragile the weapon family is per unit of impact

### Target hardness

Harder surfaces reflect more energy back into the weapon:

| Surface type | Hardness factor (approx.) |
|---|---|
| Soft flesh | 0.1 |
| Muscle / dense tissue | 0.3 |
| Bone | 0.6 |
| Light armor (leather) | 0.8 |
| Heavy armor (plate) | 1.4 |
| Stone / magical material | 2.0+ |

`target_hardness_factor` needs to come from the enemy side as a property (e.g. `surface` or `hardness`).

### Family wear coefficients

Edge weapons concentrate stress at a thin geometry → wear faster against hard surfaces. Blunt weapons spread impact → wear slower but not immune. Example ranges:

| Family | Wear coefficient (approx.) |
|---|---|
| KNIFE / BLADE | 1.4 – 1.6 |
| AXE / CURVED_BLADE | 1.1 – 1.3 |
| BLUNT / POLEARM | 0.7 – 0.9 |
| FIST | 0.5 |
| SHIELD | 0.4 |

Exact values to be tuned when plugged into combat.

---

**Blocked on:** enemy list / enemy stat system not yet defined.

**When unblocked:**
- Add `hardness` (or `surface`) property to enemies
- Wire `target_hardness_factor` into the wear calculation
- Define `family_wear_coefficient` per weapon family in `helpers/familyConfigs.ts`
