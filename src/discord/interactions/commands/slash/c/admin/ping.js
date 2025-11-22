import { SlashCommandBuilder } from "@discordjs/builders";
import { InteractionResponseType, MessageFlags } from "discord-api-types/payloads";

export const command = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

	export async function execute(interaction) {
		return new Response(
			JSON.stringify({
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: 'Pong!',
					flags: MessageFlags.Ephemeral,
				},
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}