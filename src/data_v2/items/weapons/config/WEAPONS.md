# Weapons
Weapons are grouped into **families**. Each family acts as a preset, providing base qualities that define the behavior and feel of the weapons. Individual weapons then modify these base qualities slightly.

Each weapon family includes:
- **Internal ID** - A unique identifier for programmatic reference.
- **Description** - A short description to be used in the in-game glossary.
- **Variance** - A range (min and max %) applied to the weapon's calculated damage.
- **Qualities** - Base numerical properties that describe the weapon. Uses actual units of measurements for semi-realism.

## Weapon Qualities
| Quality         | Unit / Scale        | Description                                                                    |
| --------------- | ------------------- | ------------------------------------------------------------------------------ |
| **Weight**      | grams (g)           | Mass of the weapon. Heavier weapons hit harder but may swing slower.           |
| **Speed**       | meters/second (m/s) | Swing or thrust velocity, affects kinetic energy and attack tempo.             |
| **Edge**        | millimeters (mm)    | Thickness or sharpness. Smaller → sharper → more cutting damage.               |
| **Reach**       | centimeters (m)          | How far the weapon can hit.                                           |
| **Defense**     | points (pt)             | Only for defensive weapons like shields; adds blocking value.                  |

> ⚠️ While actual units are used for realism, values are **normalized internally** to balance gameplay and keep numbers manageable.

---

## Weapon Tier

Each weapon has a **tier**, which acts as a **multiplier** on its calculated base damage. This allows lower-tier weapons to feel weaker and higher-tier weapons to feel powerful without manually tuning every number. There are 6 tiers.

---

## Damage Calculation

Damage is derived from the weapon’s **qualities** and **tier**:

1. **Calculate base energy** (kinetic or impact-based) using weight, speed, and sharpness.
2. **Apply family variance** to introduce unpredictability in combat.
3. **Apply tier multiplier** to scale the weapon’s power appropriately.
4. **Multi-family weapons** average qualities across families for hybrid effects.