# Rarity Definition

Canonical rarity strings for items.

## Rarity Map

| rarity | rank | color_hex | buy_multiplier | sell_multiplier |
| --- | --- | --- | --- | --- |
| `common` | 1 | `#9AA0A6` | 1.00 | 1.00 |
| `uncommon` | 2 | `#4CAF50` | 1.30 | 1.20 |
| `rare` | 3 | `#2196F3` | 1.80 | 1.50 |
| `epic` | 4 | `#9C27B0` | 2.80 | 2.20 |
| `legendary` | 5 | `#FF9800` | 4.50 | 3.50 |
| `mythic` | 6 | `#F44336` | 7.00 | 5.20 |

## Notes

- Keep `rarity` as a string in item rows (`"common"`, `"rare"`, etc.).
- `rank` is useful for sorting/comparisons.
- Multipliers are optional defaults for shops/loot systems.


```js
export const RARITY_MAP = {
  common: { rank: 1, colorHex: '#9AA0A6', buyMultiplier: 1.0, sellMultiplier: 1.0 },
  uncommon: { rank: 2, colorHex: '#4CAF50', buyMultiplier: 1.3, sellMultiplier: 1.2 },
  rare: { rank: 3, colorHex: '#2196F3', buyMultiplier: 1.8, sellMultiplier: 1.5 },
  epic: { rank: 4, colorHex: '#9C27B0', buyMultiplier: 2.8, sellMultiplier: 2.2 },
  legendary: { rank: 5, colorHex: '#FF9800', buyMultiplier: 4.5, sellMultiplier: 3.5 },
  mythic: { rank: 6, colorHex: '#F44336', buyMultiplier: 7.0, sellMultiplier: 5.2 },
};
```
