<div align="center">

# Armors

<img src="https://img.shields.io/badge/System-Armor-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Category-Gameplay-success?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-Active-purple?style=for-the-badge" />

<br><br>

**A complete breakdown of how armor works, how materials influence performance, and what each armor slot provides.**

</div>

---

<br>

## 📚 Navigation

- [Overview](#-overview)
- [Armor Slots](#-armor-slots)
- [Material Properties](#-material-properties)
- [Material Rankings](#-material-rankings)
- [Stat Variation](#-stat-variation)
- [Technical Reference](#-technical-reference)

<br>

# 📖 Overview

> [!NOTE]
> Every armor piece is shaped by **three core factors**.

<table>
<tr>
<th width="180">Component</th>
<th>Description</th>
</tr>
<tr>
<td>🪖 <b>Armor Type</b></td>
<td>Determines where the armor is worn and what stat it influences.</td>
</tr>
<tr>
<td>⚒️ <b>Material</b></td>
<td>Determines the armor's natural strengths, weaknesses, and behavior.</td>
</tr>
<tr>
<td>⭐ <b>Quality</b></td>
<td>Represents craftsmanship and modifies final effectiveness.</td>
</tr>
</table>

<br>

# 🪖 Armor Slots

Each slot targets a specific stat. Final output ratings are on a **0 to 1 scale**, even though some material inputs are stored in scientific units like **Pa**, **mm**, and **kg**.

<br>

### Helmet
<img src="https://img.shields.io/badge/Stat-Crit_Influence-blue?style=flat-square" />

Influences how much bonus damage you take when an enemy lands a critical hit on you. Positive Crit Influence softens the extra damage. Negative Crit Influence means the helmet fails under concentrated impact pressure and the crit hits even harder.

| Rating | Effect |
|---|---|
| **Positive** | You take less bonus damage when hit by a crit |
| **Negative** | Enemy crits are amplified against you |

<details>
<summary><b>Why does Yield Stress drive this?</b></summary>

Helmets use **Yield Stress** measured in **Pascals (Pa)**. This is the pressure threshold where a material stops holding its shape and begins to fail under concentrated force.

For a critical hit, the game compares a reference crit pressure against the helmet material's `types.helmet.yieldStress` value.

`critInfluence = clamp(1 - critPressurePa / types.helmet.yieldStress.Pascals, -1, 1)`

If the material's yield threshold is higher than the incoming crit pressure, the result is positive and the helmet reduces bonus crit damage. If the crit pressure overwhelms the material, the result goes negative and the helmet amplifies the crit instead.

- **High Yield Stress** → Better chance to resist concentrated crit pressure  
- **Low Yield Stress** → More likely to fail and amplify the crit  

</details>

<br>

### Chest Armor
<img src="https://img.shields.io/badge/Stat-Defense-green?style=flat-square" />

Influences incoming damage from attacks. Defense does not block damage outright — it scales the impact down.

| Rating | Effect |
|---|---|
| **High** | Attacks deal less damage |
| **Low** | Attacks deal closer to full damage |

<details>
<summary><b>Why do Hardness and Thickness drive this?</b></summary>

Chest armor uses a **fixed thickness in millimeters** plus **material hardness**. Most of the defense comes from hardness, while thickness adds a smaller structural bonus.

A harder chest piece is more resistant to penetration, and a thicker plate gives the hit more material to travel through before it reaches the wearer.

- **High Hardness** → Better at resisting impact and penetration  
- **More Thickness** → Adds extra stopping power  
- **Thin / Soft Materials** → Easier to punch through or compress  

</details>

<br>

### Leggings
<img src="https://img.shields.io/badge/Stat-Evasion-purple?style=flat-square" />

Influences the ability to avoid attacks. Driven by the leggings' effective elasticity and the material's root `baseWeight`.

| Rating | Effect |
|---|---|
| **High** | More likely to dodge incoming attacks |
| **Low** | Movement is restricted, harder to evade |

<details>
<summary><b>Why do Rigidity and Weight both matter?</b></summary>

Leg armor needs to flex with the body while staying light enough not to slow the wearer down.

What is stored as `types.leggings.elasticity` is really a **Young's-modulus-style rigidity value** in **Pascals (Pa)**. Higher Pa means the material is stiffer and resists motion more; lower Pa means it flexes more easily with the body. **Base Weight** is stored as actual mass in **kilograms (kg)** at the root material level, so armor items can derive their weight from the material.

Together they define how agile the wearer feels in motion.

- **Lower Rigidity / Lower Pa** → Easier flex and freer movement  
- **Lower Weight** → Faster reactions and less drag  
- **Heavy / Stiff Materials** → Slower, more restrictive movement  

</details>

<br>

### Boots
<img src="https://img.shields.io/badge/Stat-Stride-yellow?style=flat-square" />

Influences Stamina cost per movement action. Higher Stride means each step drains less of your action budget.

| Rating | Effect |
|---|---|
| **High** | Movement actions cost less Stamina |
| **Low** | Movement drains more of your action budget |

<details>
<summary><b>Why does Traction drive this?</b></summary>

Boot traction is modeled as the **coefficient of friction** (`μ`), which is a **unitless scientific ratio**. Higher `μ` means the sole grips the ground better and wastes less energy per step.

That makes it a strong driver for **Stride**, because stable footing lowers the stamina cost of moving.

- **High Traction Coefficient** → Efficient movement, less wasted energy  
- **Low Traction Coefficient** → Slipping and inefficient footing  

</details>

<br>

# 🧱 Material Properties

Every material currently exposes six internal values for armor calculations.

| Property | Stat Influenced | Description |
|---|---|---|
| **Helmet Yield Stress** (`types.helmet.yieldStress`) | Crit Influence | Pressure threshold before helmet material yields under concentrated impact |
| **Chest Hardness + Thickness** (`types.chest.hardness` + `types.chest.thickness`) | Defense | Mostly penetration resistance, with a small bonus from fixed plate thickness |
| **Leggings Rigidity** (`types.leggings.elasticity`) | Evasion | Young's-modulus-style stiffness in Pascals; lower stiffness improves agility |
| **Base Weight** (`baseWeight`) | Evasion / Mobility / Inventory | Root material mass in kilograms; heavier materials slow movement and drain more stamina |
| **Boots Traction Coefficient** (`types.boots.tractionCoefficient`) | Stride | Coefficient of friction (`μ`), a unitless measure of grip against the ground |
| **Variance** | Stat Variation | How consistent the material performs across rolls |

> [!NOTE]
> Helmets use `types.helmet.yieldStress` for signed Crit Influence. Chest defense uses `types.chest.hardness` with a small `types.chest.thickness` bonus. Leggings use `types.leggings.elasticity` plus root material `baseWeight`. Boots use `types.boots.tractionCoefficient`. Weight only penalizes — it never helps.

<br>

# ⚒️ Material Rankings

> [!IMPORTANT]
> Materials are ordered weakest → strongest by Hardness. Stronger is not always better — heavier materials hurt Evasion and Stride.

| Tier | Material | Strength | Notes |
|---|---|---|---|
| F | Paper | Elasticity | Extremely fragile, wildly inconsistent |
| F | Bread | Elasticity | Soft, unstable, no meaningful protection |
| D | Cardboard | Lightweight | Weak but more reliable than paper |
| D | Fabric | Evasion | Light starter material, decent Crit Mitigation |
| C | Seashells | Hardness | Rigid and brittle — weak helm and leggings |
| C | Bone | Defense | Stiff but functional, poor elasticity |
| B | Leather | Balanced | Reliable across all slots, true baseline |
| B | Wood | Defense | Strong chest, poor helm and leggings |
| B | Scales | Balanced | Layered mid-tier, consistent across slots |
| A | Chainmail | Elasticity | Flexible but heavy — Evasion partly offset by weight |
| A | Iron Plate | Defense | High Defense, low mobility and poor Stride |
| A | Obsidian | Hardness | Near-max Defense, near-zero elasticity — polarizing |
| S | Kevlar | Balanced | High across all properties, low Variance |
| S+ | Diamond Plate | Raw Power | Maximum Hardness, perfect consistency, but very heavy |

<br>

# 🎲 Stat Variation

Material **Variance** determines how wide the gap is between a piece's best and worst possible roll. Low Variance means two items of the same type will perform nearly identically. High Variance means the same craft can produce very different results.

<table>
<tr>
<th>Variance</th>
<th>Behavior</th>
<th>Examples</th>
</tr>
<tr>
<td><b>Low</b></td>
<td>Stable and predictable — the base stat is what you get.</td>
<td>Kevlar, Diamond Plate</td>
</tr>
<tr>
<td><b>High</b></td>
<td>Wide spread — the same material can roll very high or very low.</td>
<td>Paper, Bread</td>
</tr>
</table>

> [!TIP]
> Every armor piece outputs a `min` and `max` alongside its `base`. The gap between them is `base × variance`.

<br>

# ⚙️ Technical Reference

<details>
<summary><b>Expand Internal Data Fields</b></summary>

| Field | Description |
|---|---|
| `internalId` | Internal numeric identifier |
| `id` | Unique slug (`snake_case`) |
| `displayName` | Visible item name |
| `type` | Armor slot: `helm`, `chest`, `leggings`, `boots` |
| `material` | References a key in `materialConfigs` |
| `description` | Flavor text |
| `tags` | Descriptor tags |
| `qualityMultipliers.protection` | Craftsmanship modifier — scales the material's base stat |
| `archived` | If `true`, excluded from active armor lists |
| `created_at` | ISO creation timestamp |

</details>

---

<div align="center">

<sub>Armor values and balance may change during development.</sub>

</div>