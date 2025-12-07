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
**Enum Type:** `number`  
**Unit:** Celsius (°C)  
**Required:** Yes

**Reference:** [Celsius temperature scale](https://en.wikipedia.org/wiki/Celsius) - SI unit for measuring temperature where 0°C is water's freezing point and 100°C is its boiling point at standard atmospheric pressure.

> [!IMPORTANT]
> Extreme temperatures require appropriate gear or resistance buffs to survive extended exploration.

| Value       | Icon | Min °C | Max °C | Description                                                                                       |
| ----------- | ---- | ------ | ------ | ------------------------------------------------------------------------------------------------- |
| `FREEZING`  | 🧊   | -20    | -10    | Rapid stamina/health drain. Water frozen. Fire damage reduced, ice increased. Equipment brittle.  |
| `COLD`      | ❄️   | -9     | 5      | Slow stamina drain. Frozen puddles. Minor ice damage increase. Cold resistance recommended.       |
| `COOL`      | 🌡️   | 6      | 15     | Minimal impact. Comfortable for most adventurers. No significant modifiers.                       |
| `MODERATE`  | 👍   | 16     | 25     | Ideal conditions. No stamina drain or penalties. Balanced damage modifiers.                       |
| `WARM`      | ☀️   | 26     | 35     | Gradual stamina drain. Water evaporation common. Minor fire damage increase.                      |
| `HOT`       | 🔥   | 36     | 45     | Significant stamina drain. Heat exhaustion risk. Increased fire damage. Heat resistance required. |
| `SCORCHING` | 🌋   | 46     | 100    | Rapid health/equipment damage. No water sources. Metal hot to touch. Lava flows common.           |

<br>

### Humidity

Humidity level affects disease chance, equipment rust/decay, and environmental hazards. Each race has different humidity tolerance.

**Data Type:** `string` (enum)  
**Enum Type:** `number`  
**Unit:** Relative Humidity (% RH)  
**Required:** Yes

**Reference:** [Relative Humidity](https://en.wikipedia.org/wiki/Relative_humidity) - Ratio of current absolute humidity to the highest possible absolute humidity at that temperature, expressed as percentage. 100% RH indicates air is fully saturated with water vapor.

> [!IMPORTANT]
> Extreme humidity levels require specialized gear or protective enchantments to prevent equipment degradation and disease.

| Values      | Min RH% | Max RH% | Description                                                                                                                                                                                                        |
| ----------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ARID`      | 0       | 20      | Extremely dry air. Increased stamina drain from dehydration. Leather cracks, wood becomes brittle. Fire spreads faster. No rust or mold. Water sources scarce.                                                     |
| `DRY`       | 21      | 35      | Noticeably dry air. Minor stamina drain. Throat irritation over time. Minimal equipment decay. Fire damage slightly increased. Comfortable for desert races.                                                       |
| `MODERATE`  | 36      | 55      | Ideal humidity for most races. No penalties or bonuses. Comfortable breathing. Standard equipment durability. Balanced conditions.                                                                                 |
| `DAMP`      | 56      | 70      | Noticeable moisture. Slow equipment rust over time. Slight disease chance increase. Water puddles common. Cold feels colder. Mildew smell.                                                                         |
| `WET`       | 71      | 85      | High moisture content. Significant rust/decay on metal and organic items. Increased disease and infection risk. Slippery surfaces. Breathing feels heavy. Fungal growth common.                                    |
| `SATURATED` | 86      | 100     | Air nearly fully saturated. Rapid equipment degradation. High disease/infection chance. Visibility reduced by mist/fog. Metal corrodes quickly. Breathing difficult. Mold everywhere. Protective coating required. |

<br>

### Brightness

Brightness affects perception, stealth mechanics, spawn rate of monsters, and item loss frequency. Different races have varying vision capabilities in low-light conditions.

**Data Type:** `string` (enum)  
**Enum Type:** `float`  
**Unit:** Lux (lx)  
**Required:** Yes

**Reference:** [Lux (illuminance)](https://en.wikipedia.org/wiki/Lux) - SI unit of illuminance measuring luminous flux per unit area. 1 lux = 1 lumen/m². Human photopic vision (full color) requires >3 lux; scotopic vision (rods only, no color) operates at <0.01 lux.

> [!IMPORTANT]
> Darkness provides stealth advantages but increases danger from ambushes and environmental hazards. Light sources attract attention.

| Value        | Icon | Min Lux | Max Lux | Description                                                                                                                |
| ------------ | ---- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `PITCHBLACK` | 🌑   | 0       | 0.01    | Total darkness. Vision impossible without darkvision. Monster spawn rate highest. Navigation nearly impossible.            |
| `DARK`       | 🌘   | 0.01    | 1       | Starlight/distant glow only. Perception severely reduced. High stealth bonus. Frequent monster encounters.                 |
| `DIM`        | 🕯️   | 1       | 100     | Torchlight, scattered crystals, moonlight. Limited color vision. Moderate stealth advantage.                               |
| `LOWLIGHT`   | 💡   | 100     | 1,000   | Ambient magical glow, overcast dungeon sections. Basic visibility. Balanced perception and stealth.                        |
| `MODERATE`   | 🔆   | 1,000   | 10,000  | Well-lit areas, bioluminescent caverns. Full color vision. No light penalties or bonuses.                                  |
| `BRIGHT`     | ☀️   | 10,000  | 32,000  | Direct magical light, crystal caverns, outdoor areas. Excellent visibility. Stealth difficult.                             |
| `BLINDING`   | ✨   | 32,000  | 100,000 | Intense magical radiance, sunlit openings. Glare penalties without protection. No stealth possible. Monster spawn minimal. |

<br>

### Air Quality

Air quality affects breathing, health drain, disease chance, and visibility. Toxicity requires protective equipment or resistance buffs. Each race has different tolerances to airborne hazards.

**Data Type:** `string` (enum)  
**Enum Type:** `number`  
**Unit:** Air Quality Index (AQI)  
**Required:** Yes

**Reference:** [US EPA Air Quality Index](https://www.epa.gov/environmental-topics/air-topics) - Standardized indicator of air pollution levels. AQI integrates measurements of PM2.5, PM10, O₃, NO₂, SO₂, and CO. Scale: 0-50 (Good), 51-100 (Moderate), 101-150 (Unhealthy for Sensitive Groups), 151-200 (Unhealthy), 201-300 (Very Unhealthy), 300+ (Hazardous). See also [World AQI Project](https://waqi.info/).

> [!IMPORTANT]
> Poor air quality causes cumulative damage over time. Masks, potions, or natural resistances are essential in toxic environments.

| Value       | Icon | Min AQI | Max AQI | Description                                                                                                     |
| ----------- | ---- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `PRISTINE`  | 🌿   | 0       | 25      | Pure, fresh air. Healing rate increased. No penalties. Ideal breathing conditions.                              |
| `CLEAN`     | 💨   | 26      | 50      | Good air quality. No noticeable effects. Standard breathing.                                                    |
| `MODERATE`  | 😶   | 51      | 100     | Acceptable air. Slight dust or staleness. Minor discomfort for sensitive races.                                 |
| `POOR`      | 😷   | 101     | 150     | Noticeable pollution. Stale, dusty air. Minor stamina drain. Coughing occasionally.                             |
| `UNHEALTHY` | 🤢   | 151     | 200     | Contaminated air. Spores, dust, mild toxins. Health drain begins. Masks recommended.                            |
| `TOXIC`     | ☠️   | 201     | 300     | Poisonous fumes, heavy spores, sulfur. Significant health drain. Requires gas mask or poison resistance.        |
| `HAZARDOUS` | ⚠️   | 301     | 500     | Deadly miasma, corrosive gases, plague clouds. Rapid health loss. Death without protection. Visibility reduced. |

|
