import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { InteractionContextType } from "discord-api-types/v10";

export const command = new SlashCommandBuilder()
    .setName('party')
    .setDescription('Manage your party')
    .setContexts([InteractionContextType.PrivateChannel])
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('setup')
            .setDescription('Set current Group DM as your party')
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('sync')
            .setDescription('Sync Group DM members to your party. This makes sure members are up to date.')
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('disband')
            .setDescription('Unset current Group DM as party and delete the party data')
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
            .setName('manage')
            .setDescription('Manage party settings and members.')
    );

export async function execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case 'setup':
            return await executeSetup(interaction);
        case 'sync':
            return await executeSync(interaction);
        case 'disband':
            return await executeDisband(interaction);
        case 'manage':
            return await executeManage(interaction);
        default:
            return interaction.reply({ content: 'Unknown subcommand', ephemeral: true });
    }
}

async function executeSetup(interaction) {
    return interaction.reply({ content: 'Party setup placeholder', ephemeral: true });
}

async function executeSync(interaction) {
    return interaction.reply({ content: 'Party sync placeholder', ephemeral: true });
}

async function executeDisband(interaction) {
    return interaction.reply({ content: 'Party disband placeholder', ephemeral: true });
}

async function executeManage(interaction) {
    return interaction.reply({ content: 'Party manage placeholder', ephemeral: true });
}