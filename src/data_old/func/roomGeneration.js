import exploreOutcomeTypes from '../types/exploreOutcomeTypes.json' with { type: 'json' };
import dungeonSections from '../types/dungeonSections.json' with { type: 'json' };

// --- Utilities ---

// Converts string to SHA-256 hex digest
async function sha256Hex(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Weighted random selection helper
function weightedChoice(items, weights, seedHex) {
  const totalWeight = items.reduce((sum, key) => sum + weights[key], 0);
  const value = parseInt(seedHex.slice(0, 8), 16) % totalWeight;

  let cumulative = 0;
  for (const key of items) {
    cumulative += weights[key];
    if (value < cumulative) return key;
  }
  return items[0]; // fallback
}

// --- Dungeon Generation Logic ---

// Room type weights (higher number = more common)
function getDynamicRoomWeights() {
  const weights = {
    navigation: 30,
    puzzle: 15,
    trap: 15,
    combat: 15,
    shop: Math.random() < 0.2 ? 15 : 5,    // 20% chance shop is more frequent
    utility: Math.random() < 0.2 ? 5 : 10, // 20% chance utility is rarer
    landmark: 10
  };
  return weights;
}

// Assign a section to a server (persistent per month)
async function getDungeonSection(serverId) {
  const now = new Date();
  const monthYear = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}`;
  const seed = `${serverId}-${monthYear}`;
  const hash = await sha256Hex(seed);
  const index = parseInt(hash.slice(0, 8), 16) % dungeonSections.length;
  return dungeonSections[index];
}

// Assign floor based on category ID
async function getFloor(categoryId) {
  const hash = await sha256Hex(categoryId);
  return `Floor ${parseInt(hash.slice(0, 8), 16) % 10 + 1}`;
}

// Assign a room to a channel (weighted)
async function getRoom(channelId) {
  const hash = await sha256Hex(channelId);
  const weights = getDynamicRoomWeights();
  const roomTypes = Object.keys(weights);
  const chosenType = weightedChoice(roomTypes, weights, hash);
  const roomsOfType = exploreOutcomeTypes.filter(r => r.type.toLowerCase() === chosenType);
  const roomIndex = parseInt(hash.slice(8, 16), 16) % roomsOfType.length;
  return roomsOfType[roomIndex];
}

// Generate full room data
export async function generateRoomData(serverId, categoryId, channelId) {
  const section = await getDungeonSection(serverId);
  const floor = await getFloor(categoryId);
  const room = await getRoom(channelId);

  return { section, floor, room };
}
