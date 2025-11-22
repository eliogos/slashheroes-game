import { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder } from "@discordjs/builders";
import { MessageFlags, SeparatorSpacingSize } from "discord-api-types/payloads/v10";
import { editOriginal, defer } from "../../slashHandler.js";

export const command = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction, env, ctx) {
	// calculate latency
	ctx.waitUntil(
		(async () => {
			try {
				// Interaction Latency (Gateway/HTTP)
				const createdAt = (BigInt(interaction.id) >> 22n) + 1420070400000n;
				const interactionLatency = Date.now() - Number(createdAt);

				// Database Latency (D1)
				const start = Date.now();
				let dbLatency = null;
				if (env.DB) {
					try {
						await env.DB.prepare('SELECT 1').first();
						dbLatency = Date.now() - start;
					} catch (dbErr) {
						console.warn('DB Ping failed', dbErr);
					}
				}

				const container = new ContainerBuilder()
					.setAccentColor(0x57F287)
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent('🏓 **Pong!**')
					)
					.addSeparatorComponents(
						new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small)
					)
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(`Interaction Latency: **${interactionLatency}ms**${dbLatency !== null ? `\nDatabase Latency: **${dbLatency}ms**` : ''}`)
					);

				// Edit the original deferred message
				await editOriginal(interaction, {
					components: [container.toJSON()],
					flags: MessageFlags.IsComponentsV2
				});

			} catch (error) {
				console.error('Ping failed:', error);
			}
		})()
	);

	return defer(true);
}