# Armor Material Property Concepts

Reference for understanding what each material property represents physically and how it maps to gameplay.
All values are normalized `-1` to `1`. `0` is neutral. Negative = inverted/opposite trait. Positive = strong expression.

---

## corrosion
- How readily the material reacts with oxygen, moisture, and acids — rusting, rotting, tarnishing.
- `-1` = chemically inert, sealed against environment (platinum, treated alloys). `0` = no notable reaction. `+1` = degrades rapidly in any humidity (untreated iron, paper).
- Multiplied by climate humidity/acidity to produce a passive durability decay rate per tick. Interacts multiplicatively with `porosity` — porous materials let moisture in deeper, making high `corrosion` much worse.

---

## malleability
- How easily the material permanently reshapes under force without breaking. Not the same as softness — gold is extremely malleable but not structurally weak.
- `-1` = fully rigid, resists all reshaping. `0` = normal give. `+1` = reshapes under minimal force (gold, lead, soft copper).
- High positive values mean armor absorbs blunt hits well by distributing force, but the piece physically deforms over time, reducing `coverage`. Negative values hold shape perfectly but interact poorly with `brittleness` under sudden impacts.

---

## conductivity
- How freely the material allows electrical current and magnetic fields to pass through it.
- `-1` = active insulator, grounds and disperses electricity (dry rubber, bone). `0` = neutral. `+1` = excellent conductor (copper, silver, gold).
- Multiplies incoming lightning damage. Negative values provide mild lightning resistance. Positive also triggers sensitivity to magnetic traps and related enemy abilities.

---

## combustibility
- How easily the material ignites and how long it sustains burning once lit. Covers both ignition threshold and fuel value.
- `-1` = fire-retardant, actively reduces incoming fire damage (treated stone, wet clay). `0` = burns only under extreme sustained heat. `+1` = ignites on contact and burns hot (paper, dry straw, oil-soaked cloth).
- Multiplies incoming fire damage. Negative = passive fire resistance. Positive triggers an ignite chance on fire hit; burn DoT duration scales with the value.

---

## porosity
- The fraction of empty internal space in the material's structure, determining how much liquid it absorbs.
- `-1` = hydrophobic, repels liquids entirely (sealed metal, treated glass). `0` = normal surface behavior. `+1` = highly absorbent, soaks through quickly (raw leather, cloth, sandstone).
- Positive absorbs water in rain (weight increase), absorbs acid or poison (applies DoT to wearer). Negative means liquids bead off with no absorption penalty. Multiplied with `corrosion` — wet porous materials corrode far faster.

---

## brittleness
- The tendency to crack or shatter under sharp sudden stress, rather than deform. Opposed to toughness. Distinct from hardness — diamond is very hard but brittle.
- `-1` = impact-absorbing, energy dissipates without fracturing (dense rubber, layered composites). `0` = normal fracture threshold. `+1` = shatters under sharp impact (glass, crystal, thin ceramics).
- Positive values give critical hits a chance to permanently fracture the item, immediately reducing `durabilityMax`. That reduction cannot be repaired. High `elasticity` partially offsets this by letting the material flex before the breaking point.

---

## acoustics
- How much sound the material generates during movement or contact. A function of stiffness, surface texture, and resonance.
- `-1` = sound-dampening, quieter than ambient (padded cloth, dense treated leather). `0` = neutral. `+1` = very loud, every movement clanks (full plate, hollow metal, chainmail).
- Directly modifies stealth rating. Negative = stealth bonus from the material itself. Positive = stealth penalty. Cannot be reduced by skill alone at high values.

---

## toxicity
- Whether the material contains harmful substances that leach onto the wearer through prolonged contact — heavy metals, reactive compounds, magical contamination.
- `-1` = purifying, antimicrobial or antitoxin properties (silver, activated charcoal, certain herbs). `0` = safe. `+1` = actively poisons the wearer over time (lead alloys, arsenic-treated material).
- Positive accumulates a poison or debuff stack per wear tick — invisible to the player unless appraised. Negative provides a slow passive cleanse, reducing minor existing poison stacks over time.

---

## hardness
- Resistance to surface scratching and abrasion. Based on the Mohs scale — a softer material cannot scratch a harder one.
- `-1` = very soft, scratches from any contact (chalk, lead). `0` = average surface resistance. `+1` = extremely hard, nearly unscratchable (hardened steel, diamond-grade alloys).
- Positive slows passive edge and surface durability loss from regular wear. Also determines the minimum tool hardness required for sharpening or processing — you cannot whet a material harder than your stone.

---

## magnetism
- Ferromagnetic attraction — whether the material is pulled toward magnetic fields. Distinct from `conductivity`: copper conducts electricity well but is not magnetic; iron is moderately conductive and strongly magnetic.
- `-1` = diamagnetic, actively repels magnetic fields (gold, copper, bismuth). `0` = non-magnetic. `+1` = strongly ferromagnetic (iron, raw steel, lodestone-infused alloys).
- Positive values cause attraction to magnetic traps, compass interference, and bonus damage from magnet-based enemy attacks. Negative provides minor resistance against those same threats.

---

## luminosity
- Whether the material passively emits light. Most real materials are `0` — this property is primarily for magical, alchemical, or exotic materials.
- `-1` = light-absorbing, creates a subtle darkness in its immediate vicinity. `0` = no emission. `+1` = bright passive emission, lights a room.
- Positive provides a passive ambient light radius — eliminates the need for a torch but breaks stealth in darkness and may aggravate light-sensitive enemies. Negative creates a low darkness aura, giving a minor stealth bonus in dark environments.

---

## elasticity
- The material's ability to return to its original shape after being deformed. Not the same as malleability — elastic springs back, malleable stays bent.
- `-1` = fully inelastic, deformation energy is absorbed but the shape never returns (lead, wet clay). `0` = normal rebound. `+1` = springs back immediately from any deformation (spring steel, rubber composites).
- Positive values counteract `malleability`-based permanent deformation — the armor returns to shape after hits, slowing `coverage` loss. Also partially offsets `brittleness` by allowing the material to flex before the fracture threshold. Negative accelerates permanent shape loss.
