import { SlashCommandBuilder, ContainerBuilder, SectionBuilder, ThumbnailBuilder, TextDisplayBuilder, SeparatorBuilder, ButtonBuilder } from "@discordjs/builders";
import { MessageFlags, SeparatorSpacingSize, ButtonStyle } from 'discord-api-types/v10';
import { defer, editReply, errorReply, Colors } from '../slashCommandHandler.js';
import { stat } from 'fs/promises';
import pkg from '../../../../../../package.json' with { type: 'json' };

export const command = new SlashCommandBuilder()
  .setName('about')
  .setDescription('Learn more about SLASHHEROES.');

export async function execute(interaction, env, ctx) {

    ctx.waitUntil(
        (async () => {
            try {
                const version = pkg.version;
                let time;
                try {
                    const pkgUrl = new URL('../../../../../../package.json', import.meta.url);
                    const stats = await stat(pkgUrl);
                    time = Math.floor(stats.mtimeMs / 1000);
                } catch (statError) {
                    time = Math.floor(Date.now() / 1000);
                }

                const botAvatar = "https://cdn.discordapp.com/embed/avatars/0.png"; // TODO: Replace with actual bot avatar URL

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
                                    .setLabel("Get early access")
                                    .setCustomId("ce64230940254b16b1b24091d7f48874")
                            )
                            .addTextDisplayComponents(
                                new TextDisplayBuilder().setContent(`-# Version \`${version}\`. As of <t:${time}:F>`),
                            )
                    );

                await editReply(interaction, {
                    components: [container.toJSON()],
                    flags: MessageFlags.IsComponentsV2
                });

            } catch (error) {
                console.error('About failed:', error);
                // Optional: send error reply
            }
        })(),
    );

    return defer();
}
