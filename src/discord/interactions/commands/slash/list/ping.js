import { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder } from '@discordjs/builders';
import { MessageFlags, SeparatorSpacingSize } from 'discord-api-types/v10';
import { defer, editReply, errorReply, Colors } from '../slashCommandHandler.js';

export const command = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export async function execute(interaction, env, ctx) {

  ctx.waitUntil(
    (async () => {
      try {
        const execStart = Date.now();

        // Interaction Latency (Gateway/HTTP)
        const createdAt = (BigInt(interaction.id) >> 22n) + 1420070400000n;
        const interactionLatency = Date.now() - Number(createdAt);
        const interactionUnix = Math.floor(Date.now() / 1000);

        // Database Latency (D1)
        let dbLatency = null;
        let dbUnix = null;
        if (env.DB) {
          const start = Date.now();
          try {
            await env.DB.prepare('SELECT 1').first();
            dbLatency = Date.now() - start;
            dbUnix = Math.floor(Date.now() / 1000);
          } catch (dbErr) {
            console.warn('DB Ping failed', dbErr);
          }
        }

        // Network Latency (Discord REST API)
        const startApi = Date.now();
        await fetch('https://discord.com/api/v10/gateway');
        const apiLatency = Date.now() - startApi;
        const apiUnix = Math.floor(Date.now() / 1000);

        // Execution Latency (Worker processing)
        const execLatency = Date.now() - execStart;
        const execUnix = Math.floor(Date.now() / 1000);

        const container = new ContainerBuilder()
          .setAccentColor(Colors.Success)
          .addTextDisplayComponents(
            new TextDisplayBuilder().setContent('🏓 **Pong!**'),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setDivider(true)
              .setSpacing(SeparatorSpacingSize.Small),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
              `🛰️ Interaction Latency: \`${interactionLatency}ms\` (<t:${interactionUnix}:R>)` +
              (dbLatency !== null
                ? `\n💾 Database Latency: \`${dbLatency}ms\` (<t:${dbUnix}:R>)`
                : '') +
              `\n🌐 Network Latency: \`${apiLatency}ms\` (<t:${apiUnix}:R>)` +
              `\n⚡ Execution Latency: \`${execLatency}ms\` (<t:${execUnix}:R>)`,
            ),
          );

        await editReply(interaction, {
          components: [container.toJSON()],
          flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
        });
      } catch (error) {
        console.error('Ping failed:', error);
      }
    })(),
  );

  return defer(true);
}
