# Weapons
Weapon families are defined in [familyConfigs.js](./familyConfigs.js).

Each family provides:
- `id`
- `key`
- `description`
- `qualities`

`id` is a numeric bit flag from `WEAPON_FAMILY`, and weapons store their family membership as a single `familyFlag` integer in per-family JSON files (e.g. `blade.json`, `knife.json`).

Current weapon quality fields:
- `weight`
- `speed`
- `edge`
- `reach`
- `curvature`

Weapons are defined as JS classes using `new Weapon()` with a builder pattern in per-family files (e.g. `blade.js`, `knife.js`). [weapons.js](./weapons.js) aggregates all family files and serves the combined data to the rest of the app.

Damage is based on normalized qualities plus tier scaling, then curvature is used to tighten or widen the min/max damage spread around the base result. The old per-family variance system is no longer part of the current weapon model.
