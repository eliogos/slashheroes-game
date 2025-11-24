import { SlashCommandBuilder, ModalBuilder, LabelBuilder, UserSelectMenuBuilder, TextDisplayBuilder } from "@discordjs/builders";
import { InteractionContextType, InteractionResponseType } from 'discord-api-types/payloads/v10';
import { ChannelType, MessageFlags } from 'discord-api-types/v10';
import { defer, editReply } from '../slashCommandHandler.js';

export const command = new SlashCommandBuilder()
    .setName('party')
    .setDescription('Send an invite to your party')
    .setContexts([InteractionContextType.PrivateChannel]);

export async function execute(interaction, env, ctx) {
    try {
        const isGroupDM = (interaction?.channel?.type ?? 0) === ChannelType.GroupDM;

        if (!isGroupDM) {
            return new Response(JSON.stringify({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    flags: MessageFlags.Ephemeral,
                    content: "❌ This command only works in Group DMs."
                }
            }), { headers: { 'Content-Type': 'application/json' } });
        }

        const userId = interaction.member?.user?.id || interaction.user?.id;

        // Create modal with user select menu
        const modal = new ModalBuilder()
            .setCustomId('party_invite_modal')
            .setTitle('Invite Players to Party');

        const userSelect = new UserSelectMenuBuilder()
            .setCustomId('selected_users')
            .setPlaceholder('Select users to invite')
            .setMinValues(1)
            .setMaxValues(5)
            .setDefaultUsers([userId]); 

        const noteDisplay = new TextDisplayBuilder()
            .setContent('Select up to 5 users to invite to your party.');

        modal.addLabelComponents(
            new LabelBuilder()
                .setLabel('Choose Party Members')
                .setDescription('Select the users you want to invite.')
                .setUserSelectMenuComponent(userSelect)
        );

        modal.addTextDisplayComponents(noteDisplay);

        return new Response(JSON.stringify({
            type: InteractionResponseType.Modal,
            data: modal.toJSON(),
        }), { headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Party command failed:', error);
        return new Response(JSON.stringify({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                flags: MessageFlags.Ephemeral,
                content: "❌ An error occurred."
            }
        }), { headers: { 'Content-Type': 'application/json' } });
    }
}