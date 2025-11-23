import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags } from 'discord-api-types/v10';
import { defer, editReply } from '../slashCommandHandler.js';

export const command = new SlashCommandBuilder()
    .setName('party')
    .setDescription('Send an invite to your party');

export async function execute(interaction, env, ctx) {
    ctx.waitUntil((async () => {
        try {
            const isGroupDM = (interaction?.channel?.type ?? 0) === 3;

            if (!isGroupDM) {
                await editReply(interaction, {
                    flags: MessageFlags.Ephemeral,
                    content: "❌ This command only works in Group DMs."
                });
                return;
            }

            await editReply(interaction, {
                flags: MessageFlags.Ephemeral,
                content: "Party invite sent test"
            });
        } catch (error) {
            console.error('Party command failed:', error);
        }
    })());

    return defer(true);
}