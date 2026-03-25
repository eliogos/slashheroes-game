# Regions
Dungeon regions affect rooms generated per channel. It acts as a top=level condition for all rooms.
Regions are assigned to servers.

# Floors
Floors affect the chances of rooms to appear, and the number of monsters to be encountered in a single room.
Floors are assigned to server categories.

# Rooms
Rooms are where the adventure begins. As players venture to these rooms via the `/explore` command, they may encounter enemies, find loot, fall into a trap, find clues, solve puzzles, and more.
Rooms can be special or empty. A player can use the command many times in the same room unless the room conditions don't allow the player to continue or the room is already empty.
Rooms are assigned to all server channels with a set "steps" for each room. Rooms can have an extra condition alongside region conditions.

=================================

# Room generation logic

## Overview
All region, floor, and room generation logic will be based on their Discord Snowflakes so it stays persistent no matter what without relying on storing the IDs and setting it.
This also makes it dynamic as generations also reset every month.

## Snowflake-Based Generation

### Why Snowflakes?
Discord Snowflakes are unique 64-bit identifiers that contain timestamp information. By using these IDs as seeds:
- **Consistency**: Same location always generates same content
- **No Database Storage**: Don't need to store dungeon layouts
- **Deterministic**: Predictable yet pseudo-random generation
- **Automatic Resets**: Monthly rotation based on timestamp extraction

### Hierarchy Mapping
```
Server ID (Guild)     → Dungeon Region
Category ID           → Floor Level
Channel ID            → Room Type & Contents
```

### Generation Algorithm

1. **Region Assignment** (Server Level)
   - Extract server snowflake
   - Apply modulo operation with total region count
   - Result determines which dungeon region (Cave, Crypt, Castle, etc.)
   - Regions have global properties affecting all rooms in that server

2. **Floor Assignment** (Category Level)
   - Use category ID (or fallback to server ID if no category)
   - Category ID directly determines base difficulty tier
   - No sequential floor numbers (bot can't access channel positioning)
   - Category hash determines:
     - Base enemy spawn rates (static per category)
     - Base loot quality multipliers (static per category)
     - Room type probabilities
     - Monster difficulty scaling
   - Monthly dynamic modifiers applied on top:
     - Spawn rate multiplier (changes each month)
     - Loot quality multiplier (changes each month)
     - Danger level modifier (affects trap/enemy strength)
   - Players experience difficulty based on category snowflake, not position

3. **Room Generation** (Channel Level)
   - Combine channel ID + current month/year as seed
   - Generate room properties:
     - Room type (combat, treasure, trap, puzzle, empty, etc.)
     - Number of steps/encounters available
     - Specific enemy types (based on floor + region)
     - Loot tables (weighted by floor level)
     - Special conditions or events

### Monthly Reset Mechanism

```javascript
// Pseudo-code example
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const monthSeed = currentYear * 12 + currentMonth;

// Category determines base difficulty (stays consistent)
const categoryDifficulty = determineDifficulty(categoryId); // Static

// Monthly dynamic multipliers for this category
const spawnRateMultiplier = getMonthlyMultiplier(categoryId, monthSeed, 'spawn');
const lootMultiplier = getMonthlyMultiplier(categoryId, monthSeed, 'loot');
const dangerModifier = getMonthlyMultiplier(categoryId, monthSeed, 'danger');

// Room generation changes monthly
const roomSeed = channelId + monthSeed;
const roomData = generateRoom(roomSeed, categoryDifficulty, {
  spawnRateMultiplier,
  lootMultiplier,
  dangerModifier
}, regionRules);
```

This ensures:
- **Category difficulty stays consistent** - Same category = same base difficulty
- **Rooms change monthly** - Different layout/type each month
- **Dynamic difficulty** - Same category can be easier/harder depending on month
- **Spawn rates vary** - More or fewer enemies per month
- **Loot quality fluctuates** - Better/worse rewards monthly
- Players can't memorize exact room layouts
- Fresh content without manual intervention
- Historical data remains retrievable if needed

## Room State Management

### Persistent vs Ephemeral
- **Ephemeral** (No storage):
  - Initial room generation
  - Base room properties
  - Available encounters
  
- **Persistent** (Database storage):
  - Player progress in room (steps taken)
  - Defeated enemies
  - Collected loot
  - Completed puzzles
  - Room cleared status
  - **Portal destinations** - Links to other channels must be stored
    - Portal rooms respond with channel links (e.g., <#123456789>)
    - Players can click to jump to destination channel
    - Portals create interconnected dungeon networks

### Steps System
Each room has a finite number of "steps" or interactions:
- Combat rooms: 1-5 enemy encounters
- Treasure rooms: 1-3 loot opportunities  
- Trap rooms: Single trigger (unless multi-trap)
- Puzzle rooms: Multiple attempts allowed
- Portal rooms: Permanent link (reusable, stored in DB)
- Empty rooms: Single exploration message

Once steps are exhausted, room becomes "cleared" and exploration yields nothing new.
**Exception**: Portal rooms remain active indefinitely and display stored channel link.

## Special Room Conditions

### Dead End
- Assigned at category/channel level
- Blocks further exploration permanently
- Used to create natural dungeon boundaries
- Prevents infinite exploration abuse
- Stores dead-end channels temporarily to prevent category-switching exploits

### Anti-Abuse Measures
1. **Age Verification**
   - Server must be 3+ days old
   - Category must be 3+ days old
   - Channel must be 3+ days old
   - Prevents fresh server/channel spam

2. **Rate Limiting** (Future)
   - Cooldown per player per room
   - Daily exploration limits
   - Anti-bot detection

3. **Dead-End Persistence**
   - Store dead-end channel IDs
   - Prevent category switching to bypass
   - Expire after dungeon reset (monthly)

## Weighted Probabilities

### Room Type Distribution (Example)
Based on category difficulty tier (determined by category ID hash):
```
Easy Tier (hash mod result 0-2):
- Empty: 30%
- Combat: 35%
- Treasure: 20%
- Trap: 10%
- Puzzle: 5%

Medium Tier (hash mod result 3-6):
- Empty: 20%
- Combat: 40%
- Treasure: 15%
- Trap: 15%
- Puzzle: 10%

Hard Tier (hash mod result 7+):
- Empty: 10%
- Combat: 45%
- Treasure: 20%
- Trap: 15%
- Puzzle: 10%
```

### Region Modifiers
Different regions alter base probabilities:
- **Cave**: More traps, fewer treasures
- **Crypt**: More undead enemies, cursed loot
- **Castle**: More puzzles, elite enemies
- **Dead End**: 100% blocked, no generation

## Monthly Multiplier System

### How Multipliers Work
Each month, categories get dynamic multipliers that affect gameplay:

1. **Spawn Rate Multiplier** (0.5x - 2.0x)
   - Determines enemy encounter frequency
   - Low months: Fewer enemies, safer exploration
   - High months: More enemies, increased challenge

2. **Loot Quality Multiplier** (0.7x - 1.5x)
   - Affects rarity and quantity of drops
   - High loot months reward brave explorers
   - Low loot months encourage strategic planning

3. **Danger Modifier** (0.5x - 2.0x difficulty scale)
   - Adjusts effective category difficulty
   - Same category feels different each month
   - Creates variety without changing base difficulty

### Multiplier Generation
```javascript
// Example calculation
const baseMultiplier = hash(categoryId + monthSeed + 'spawn') % 151;
const spawnRate = 0.5 + (baseMultiplier / 100); // Range: 0.5 - 2.0

// Could create "hot" and "cold" months
// Hot month: High spawns, high loot, high danger
// Cold month: Low spawns, low loot, easier
```

### Player Strategy
- Check multipliers before exploring (future UI feature)
- Farm during high loot months
- Level up during low danger months
- Risk/reward decision making
- Different categories provide different base difficulties
- No way to know category "order" - each is unique

## Future Enhancements

### Dynamic Difficulty
- Scale based on player level/gear
- Adjust enemy HP/damage per category tier
- Better loot for higher risk
- Personal difficulty modifiers
- Category-based progression (not sequential floors)

### Event Rooms
- Seasonal special rooms
- Boss rooms (category-wide)
- Secret rooms (rare random chance)
- Merchant rooms (trading hub)
- Portal rooms (stored channel links for navigation)

### Interconnected Dungeons
- Portals between server dungeons
- Cross-server raid content
- Guild dungeon ownership

### Room Memory
- Track first discoverer
- Show room history (defeated by, looted by)
- Leaderboards per dungeon region

