import { sendFollowUp } from '../slashHandler.js';
import { generateRoomData } from '../../../../../data/func/roomGeneration.js';

// Discord command definition
export const command = {
  name: 'explore',
  description: 'Explore the dungeon',
  type: 1
};

const DISCORD_EPOCH = 1420070400000;
const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

/** Checks if a Discord snowflake is older than 3 days. */
function isOldEnough(snowflake) {
  if (!snowflake) return true; // Don't block if ID is missing
  const timestamp = (Number(BigInt(snowflake) >> 22n) + DISCORD_EPOCH);
  return (Date.now() - timestamp) > THREE_DAYS_IN_MS;
}

// Execute slash command
export async function execute(payload, env, ctx) {
  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(processExplore(payload, env));
  } else {
    // Fallback for environments without waitUntil
    processExplore(payload, env).catch(err => console.error('Error in processExplore:', err));
  }
  return { type: 5 };
}

async function processExplore(payload, env) {

  try {
    const serverId = payload.guild_id;
    const categoryId = payload.channel?.parent_id;
    const channelId = payload.channel_id;

    // --- Age Verification ---
    if (!isOldEnough(serverId)) {
      await sendFollowUp(payload, { content: "This server is too new. Please wait a few days before exploring." });
      return;
    }
    if (!isOldEnough(channelId)) {
      await sendFollowUp(payload, { content: "This channel is too new. Please wait a few days before exploring." });
      return;
    }
    if (categoryId && !isOldEnough(categoryId)) {
      await sendFollowUp(payload, { content: "This channel category is too new. Please wait a few days before exploring." });
      return;
    }

    // Use the original logic for the generation seed (category or guild)
    const generationCategoryId = payload.channel?.parent_id || payload.guild_id;

    // Generate room data
    const data = await generateRoomData(serverId, generationCategoryId, channelId);
    console.log("Generated Room Data:", data);

    // Handle the "Dead End" section
    if (data.section.name === 'Dead End') {
      await sendFollowUp(payload, {
        content: `You've reached a dead end. ${data.section.description}`
      });
      return;
    }

    // Send follow-up
    await sendFollowUp(payload, {
      content: `You explore ${data.floor} of ${data.section.name}.\n` +
               `Room Type: ${data.room.type}\n` +
               `Room Name: ${data.room.name}\n` +
               `${data.room.description}`,
      flags: 1 << 6 // Ephemeral
    });
  } catch (err) {
    console.error("Error during explore command:", err);
    await sendFollowUp(payload, {
      content: "❌ Something went wrong while exploring the dungeon."
    });
  }
}
