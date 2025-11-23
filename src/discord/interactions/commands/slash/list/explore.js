import { SlashCommandBuilder } from '@discordjs/builders';
import { defer, followUp } from '../slashCommandHandler.js';
import { MessageFlags } from 'discord-api-types/v10';
import { generateRoomData } from '../../../../../data/func/roomGeneration.js';

export const command = new SlashCommandBuilder()
  .setName('explore')
  .setDescription('Explore the dungeon')
  .setContexts([InteractionContextType.PrivateChannel, InteractionContextType.Guild]);

const DISCORD_EPOCH = 1420070400000;
const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

/** Checks if a Discord snowflake is older than 3 days. */
function isOldEnough(snowflake) {
  if (!snowflake) return true; // Don't block if ID is missing
  const timestamp = (Number(BigInt(snowflake) >> 22n) + DISCORD_EPOCH);
  return (Date.now() - timestamp) > THREE_DAYS_IN_MS;
}

export async function execute(interaction, env, ctx) {
  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(processExplore(interaction, env));
  } else {
    // Fallback for environments
    processExplore(interaction, env).catch(err => console.error('Error in processExplore:', err));
  }
  return defer(true);
}

async function processExplore(interaction, env) {
  try {
    const serverId = interaction.guild_id;
    const categoryId = interaction.channel?.parent_id;
    const channelId = interaction.channel_id;

    // --- Age Verification ---
    if (!isOldEnough(serverId)) {
      await followUp(interaction, { content: "This server is too new. Please wait a few days before exploring.", flags: MessageFlags.Ephemeral });
      return;
    }
    if (!isOldEnough(channelId)) {
      await followUp(interaction, { content: "This channel is too new. Please wait a few days before exploring.", flags: MessageFlags.Ephemeral });
      return;
    }
    if (categoryId && !isOldEnough(categoryId)) {
      await followUp(interaction, { content: "This channel category is too new. Please wait a few days before exploring.", flags: MessageFlags.Ephemeral });
      return;
    }

    // Use the original logic for the generation seed (category or guild)
    const generationCategoryId = interaction.channel?.parent_id || interaction.guild_id;

    // Generate room data
    const data = await generateRoomData(serverId, generationCategoryId, channelId);
    console.log('Generated Room Data:', data);

    // Block "Dead End" sections
    if (data.section.name === 'Dead End') {
      await followUp(interaction, {
        content: `You've reached a dead end. ${data.section.description}`,
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    // Send follow-up
    await followUp(interaction, {
      content: `You explore ${data.floor} of ${data.section.name}.\n` +
               `Room Type: ${data.room.type}\n` +
               `Room Name: ${data.room.name}\n` +
               `${data.room.description}`,
      flags: MessageFlags.Ephemeral
    });
  } catch (err) {
    console.error('Error during explore command:', err);
    await followUp(interaction, {
      content: '❌ Something went wrong while exploring the dungeon.',
      flags: MessageFlags.Ephemeral
    });
  }
}
