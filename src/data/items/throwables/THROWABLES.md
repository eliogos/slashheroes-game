# Throwables

Throwables are stored separately from weapons in [throwables.json](./throwables.json), and [throwables.js](./throwables.js) serves that data.

They currently use the same schema shape as weapons:
- `internalId`
- `id`
- `displayName`
- `description`
- `tags`
- `localization`
- `tier`
- `grip`
- `qualityMultipliers`
- `created_at`
- `familyFlag`

This separation is intentional:
- weapons are for equipped weapon types
- throwables are consumable or hand-thrown combat items
- throwables get an extra base bonus to `reach` and `curvature` through [resolveThrowableQualities.js](./resolveThrowableQualities.js)

If you want, the next step can be a dedicated throwable test command or a separate damage formula for throwables.
