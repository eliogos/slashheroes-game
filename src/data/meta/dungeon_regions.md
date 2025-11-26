# Dungeon Regions

Dungeon regions affect room generation per channel, acting as top-level environmental conditions that influence all rooms within them. Effects from region attributes scale dynamically with player level.

> [!NOTE]
> Regions are assigned to Server IDs.

---

<br>

# Region Attributes

Attributes define the environmental, structural, and thematic characteristics of a region.

## Temperature

Temperature affects player stamina drain, equipment durability, and fire/ice damage modifiers. Each race has different heat and cold tolerance levels.

**Data Type:** `string` (enum)  
**Unit:** Celsius (°C)  
**Required:** Yes

> [!IMPORTANT]
> Extreme temperatures require appropriate gear or resistance buffs to survive extended exploration.

| Value | Icon | Min °C | Max °C | Description |
|-------|------|--------|--------|---------|
| `FREEZING` | 🧊 | -20 | -10 | Rapid stamina/health drain. Water frozen. Fire damage reduced, ice increased. Equipment brittle. |
| `COLD` | ❄️ | -9 | 5 | Slow stamina drain. Frozen puddles. Minor ice damage increase. Cold resistance recommended. |
| `COOL` | 🌡️ | 6 | 15 | Minimal impact. Comfortable for most adventurers. No significant modifiers. |
| `MODERATE` | 👍 | 16 | 25 | Ideal conditions. No stamina drain or penalties. Balanced damage modifiers. |
| `WARM` | ☀️ | 26 | 35 | Gradual stamina drain. Water evaporation common. Minor fire damage increase. |
| `HOT` | 🔥 | 36 | 45 | Significant stamina drain. Heat exhaustion risk. Increased fire damage. Heat resistance required. |
| `SCORCHING` | 🌋 | 46 | 100 | Rapid health/equipment damage. No water sources. Metal hot to touch. Lava flows common. |

---

### Humidity
Humidity level affects disease chance, equipment rust/decay, and environmental hazards. Each race has different humidity tolerance.

**Data Type:** `string` (enum)  
**Unit:** Relative Humidity
**Required:** Yes

| Values | Min RH% | Max RH% | Description |
| ------ | ------- | ------- | ------- |
| `ARID` | 0 | 20 | Very low moisture.|
| `DRY` | 21 | 35 | Noticeable dry air. |
| `MODERATE` | 36 | 55 | Ideal humidity for humans. |
| `DAMP` | 56 | 70 | Noticeable moisture. |
| `WET` | 71 | 85 | High moisture. |
| `SATURATED` | 86 | 100 | Air almost saturated. |
<!-- TODO: Adjust description -->


### Brightness
Brightness affects perceptions, stealth mechanics, spawn rate of monsters, and item loss frequency.
