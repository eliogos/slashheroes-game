# Weapons
Weapon families are defined in [`helpers/familyConfigs.ts`](./helpers/familyConfigs.ts).

Each family provides:
- `id`
- `key`
- `description`
- `qualities`

`id` is a numeric bit flag from `WEAPON_FAMILY`, and weapons store their family membership as a single `familyFlag` integer.

Current weapon quality fields:
- `weight`
- `speed`
- `edge`
- `reach`
- `curvature`

Weapons are now defined as plain TypeScript data via `defineWeapon()` in one file per entry under [`_entries/`](./_entries/). Family membership stays bitflag-based, so entries can use expressions like `families: AXE | MISC` via the exported weapon-family constants. [`helpers/weaponEntries.ts`](./helpers/weaponEntries.ts) aggregates those files, and [`index.ts`](./index.ts) exposes the public weapon API.

Damage is based on normalized qualities plus tier scaling, then curvature is used to tighten or widen the min/max damage spread around the base result. The old per-family variance system is no longer part of the current weapon model.
