# Ammo

Ammo is defined as JS classes using `new Ammo()` from [AmmoItem.js](./AmmoItem.js) in per-family files such as `projectile.js`, `battery.js`, and `firearm.js`. [ammo.js](./ammo.js) aggregates those files and serves the combined data to the rest of the app.

Current ammo fields:
- `qualities.weight`
- `compatibleFamilyFlag`
- `weaponAmplifiers`

This data is intentionally lightweight for now:
- ammo contributes its own mass baseline through `qualities.weight`
- `compatibleFamilyFlag` uses the same numeric family bits as weapons
- `weaponAmplifiers` is an optional future hook for cases like `handcannon` amplifying `pellet` better than `sling`

The actual combine formula between weapon and ammo is not wired yet.
