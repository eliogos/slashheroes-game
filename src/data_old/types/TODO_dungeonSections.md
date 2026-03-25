# Dungeon Regions
Dungeon regions affect rooms generated per channel. It acts as a top=level condition for all rooms.
Regions are assigned to servers.

___

<br>

# Region Attributes
Each region has specigic base attributes that scale with the player's level.

## Environmental Attributes

### Temperature
**Data Type:** `enum`  
**Description:** Temperature affects player stamina drain, equipment durability, and modifies fire/ice damage. Extreme temperatures require appropriate gear or protection spells to survive extended exploration.

**Values:**
- 🧊 **Freezing** (`-20°C to -10°C / -4°F to 14°F`)
  - Severe cold that rapidly drains stamina and health without cold resistance gear
  - Water sources frozen solid, increased ice damage taken
  - Fire damage dealt is reduced, ice damage dealt is increased
  - Equipment may become brittle and more prone to breaking

<br>
  
- ❄️ **Cold** (`-9°C to 5°C / 16°F to 41°F`)
  - Noticeable cold that slowly drains stamina over time
  - Puddles and shallow water frozen, slippery surfaces common
  - Minor increase to ice damage taken, minor reduction to fire damage taken
  - Cold resistance gear recommended for extended stays
  
<br> 
  
- 🌡️ **Cool** (`6°C to 15°C / 43°F to 59°F`)
  - Mild coolness that has minimal impact on exploration
  - Comfortable temperature for most adventurers
  - No significant damage modifiers
  - Standard gear sufficient

  <br>
  
- ⚪ **Moderate** (`16°C to 25°C / 61°F to 77°F`)
  - Ideal temperature for exploration and combat
  - No stamina drain or equipment penalties
  - Balanced damage modifiers for all elements
  - Most comfortable dungeon environment

  <br>
  
- ☀️ **Warm** (`26°C to 35°C / 79°F to 95°F`)
  - Noticeable heat that gradually increases stamina drain
  - Water sources present but evaporation common
  - Minor increase to fire damage taken, minor reduction to ice damage taken
  - Light armor recommended
  
  <br>
  
- 🔥 **Hot** (`36°C to 45°C / 97°F to 113°F`)
  - Intense heat causing significant stamina drain
  - Most water evaporated, heat exhaustion risk
  - Increased fire damage taken, reduced ice damage taken
  - Heat resistance gear required for safe exploration
  
  <br>

- 🌋 **Scorching** (`46°C+ / 115°F+`)
  - Extreme heat that rapidly damages health and equipment
  - No natural water sources, metal objects become hot to touch
  - Greatly increased fire damage taken, ice damage negated
  - Specialized heat resistance gear and potions mandatory
  - Lava flows and fire hazards common

  <br>

