# Elements Definition

Canonical element values for `enchantment.element_id` and elemental effects.

## Element Map

| element_id | name | status_theme | strong_vs | weak_vs |
| --- | --- | --- | --- | --- |
| `none` | Neutral | No elemental status | - | - |
| `fire` | Fire | Burn/ignite | `ice`, `nature` | `water` |
| `ice` | Ice | Chill/freeze | `wind`, `fire` (control) | `fire` |
| `water` | Water | Drench/flow | `fire` | `lightning`, `nature` |
| `earth` | Earth | Guard/slow | `lightning` | `wind` |
| `wind` | Wind | Speed/bleed | `earth` | `ice` |
| `lightning` | Lightning | Shock/stun | `water`, `wind` | `earth` |
| `light` | Light | Purify/heal | `shadow` | `none` |
| `shadow` | Shadow | Curse/drain | `light` (corrupt) | `light` |
| `nature` | Nature | Poison/root | `water` (control), `earth` | `fire` |

## Notes

- Store element as lowercase string (`"fire"`, `"ice"`, etc.).
- Use `none` when no element is applied.
- `enchantment.element_id` should reference only values from this list.


```js
export const ELEMENTS = [
  'none',
  'fire',
  'ice',
  'water',
  'earth',
  'wind',
  'lightning',
  'light',
  'shadow',
  'nature',
];
```
