import { SlashCommandBuilder, ContainerBuilder, SectionBuilder, ThumbnailBuilder, TextDisplayBuilder, SeparatorBuilder, ButtonBuilder } from "@discordjs/builders";
import { InteractionContextType } from 'discord-api-types/payloads/v10';
import { MessageFlags, SeparatorSpacingSize, ButtonStyle } from 'discord-api-types/v10';
import { defer, editReply, errorReply, Colors } from '../slashCommandHandler.js';
import { stat } from 'fs/promises';
import pkg from '../../../../../../package.json' with { type: 'json' };

export const command = new SlashCommandBuilder()
    .setName('about')
    .setDescription('Learn more about SLASHHEROES.')
    .setContexts([InteractionContextType.PrivateChannel, InteractionContextType.Guild, InteractionContextType.BotDM]);
    
export async function execute(interaction, env, ctx) {

    ctx.waitUntil(
        (async () => {
            try {
                const version = pkg.version;
                
                let time;
                try {
                    if (process.env.BUILD_TIME) {
                        time = Math.floor(new Date(process.env.BUILD_TIME).getTime() / 1000);
                    } else {
                        const pkgUrl = new URL('../../../../../../package.json', import.meta.url);
                        const stats = await stat(pkgUrl);
                        time = Math.floor(stats.mtimeMs / 1000);
                    }
                } catch (statError) {
                    time = Math.floor(Date.now() / 1000);
                }

                // Get bot avatar dynamically from the application data
                const appId = interaction.application_id;
                let botAvatar = "https://cdn.discordapp.com/embed/avatars/0.png"; // fallback
                
                try {
                    const botResponse = await fetch(`https://discord.com/api/v10/applications/${appId}/rpc`, {
                        headers: {
                            'Authorization': `Bot ${env.DISCORD_APP_TOKEN}`
                        }
                    });
                    
                    if (botResponse.ok) {
                        const botData = await botResponse.json();
                        if (botData.icon) {
                            botAvatar = `https://cdn.discordapp.com/app-icons/${appId}/${botData.icon}.png?size=256`;
                        }
                    }
                } catch (avatarError) {
                    console.warn('Failed to fetch bot avatar:', avatarError);
                }

                const container = new ContainerBuilder()
                    .setAccentColor(Colors.Info)
                    .addSectionComponents(
                        new SectionBuilder()
                            .setThumbnailAccessory(
                                new ThumbnailBuilder()
                                    .setURL(botAvatar)
                            )
                            .addTextDisplayComponents(
                                new TextDisplayBuilder().setContent("# SLASHHEROES"),
                                new TextDisplayBuilder().setContent("SLASHHEROES is a text-based dungeon crawler game using Discord's slash commands with User Apps support. Fight enemies and hunt monsters, obtain loot, join a party and more!"),
                            )
                    )
                    .addSeparatorComponents(
                        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true)
                    )
                    .addSectionComponents(
                        new SectionBuilder()
                            .setButtonAccessory(
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel("Sign up for beta")
                                    .setCustomId("modal_joinbeta")
                            )
                            .addTextDisplayComponents(
                                new TextDisplayBuilder().setContent(`Version \`${version}\` as of <t:${time}:F>`),
                                new TextDisplayBuilder().setContent(`-# If you uninstall this app, all your data will be deleted after 14 days.`),
                            )
                    );

                await editReply(interaction, {
                    components: [container.toJSON()],
                    flags: MessageFlags.IsComponentsV2
                });

            } catch (error) {
                console.error('About failed:', error);
            }
        })(),
    );

    return defer();
}
