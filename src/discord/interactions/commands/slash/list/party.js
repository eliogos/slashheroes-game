import { SlashCommandBuilder } from "@discordjs/builders";
import { InteractionContextType } from 'discord-api-types/payloads/v10';
import { ChannelType, MessageFlags } from 'discord-api-types/v10';
import { defer, editReply } from '../slashCommandHandler.js';

export const command = new SlashCommandBuilder()
    .setName('party')
    .setDescription('Send an invite to your party')
    .setContexts([InteractionContextType.PrivateChannel]);

export async function execute(interaction, env, ctx) {
    ctx.waitUntil((async () => {
        try {
            const isGroupDM = (interaction?.channel?.type ?? 0) === ChannelType.GroupDM;

            if (!isGroupDM) {
                await editReply(interaction, {
                    flags: MessageFlags.Ephemeral,
                    content: "❌ This command only works in Group DMs."
                });
                return;
            }

            const userId = interaction.member?.user?.id || interaction.user?.id;
            const channelId = interaction.channel_id;

            // Fetch channel info to get recipients
            const channelResponse = await fetch(`https://discord.com/api/v10/channels/${channelId}`, {
                headers: {
                    'Authorization': `Bot ${env.DISCORD_APP_TOKEN}`
                }
            });

            if (!channelResponse.ok) {
                console.error('Failed to fetch channel:', await channelResponse.text());
                await editReply(interaction, {
                    flags: MessageFlags.Ephemeral,
                    content: "❌ Could not fetch group chat information."
                });
                return;
            }

            const channelData = await channelResponse.json();
            const recipients = channelData.recipients || [];
            
            // Format recipient info
            const recipientInfo = recipients.map(user => 
                `<@${user.id}> (${user.username})`
            ).join('\n');

            console.log('Channel data:', channelData);
            console.log('Recipients:', recipients);

            await editReply(interaction, {
                flags: MessageFlags.Ephemeral,
                content: `**Group DM Info:**\nChannel ID: ${channelId}\nYour ID: ${userId}\n\n**Recipients (${recipients.length}):**\n${recipientInfo || 'None found'}`
            });

        } catch (error) {
            console.error('Party command failed:', error);
            await editReply(interaction, {
                flags: MessageFlags.Ephemeral,
                content: `❌ An error occurred: ${error.message}`
            });
        }
    })());

    return defer(true);
}