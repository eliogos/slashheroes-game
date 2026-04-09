# Ammo

Ammo is now defined as typed plain-data entries using `defineAmmo()` from `helpers/defineAmmo.ts`, with one file per ammo item under `_entries/`. `index.ts` aggregates those entries and exposes the final ammo list.

Current ammo fields:
- `qualities.weight` (stored in grams, authored semantically via `Mass.FromGrams(...).Grams`)
- `compatibleFamilyFlag`
- `weaponAmplifiers`

This data is intentionally lightweight for now:
- ammo contributes its own mass baseline through `qualities.weight`
- `compatibleFamilyFlag` uses the same numeric family bits as weapons
- `weaponAmplifiers` is an optional future hook for cases like `handcannon` amplifying `pellet` better than `sling`

The actual combine formula between weapon and ammo is not wired yet.
