# Ammo

Ammo is stored in [ammo.json](./ammo.json), and [ammo.js](./ammo.js) serves that data to the rest of the app.

Current ammo fields:
- `qualities.weight`
- `compatibleFamilyFlag`
- `weaponAmplifiers`

This data is intentionally lightweight for now:
- ammo contributes its own mass baseline through `qualities.weight`
- `compatibleFamilyFlag` uses the same numeric family bits as weapons
- `weaponAmplifiers` is an optional future hook for cases like `handcannon` amplifying `pellet` better than `sling`

The actual combine formula between weapon and ammo is not wired yet.
