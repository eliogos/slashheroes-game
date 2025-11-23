import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { InteractionContextType } from 'discord-api-types/payloads/v10';
import { reply } from '../../slash/slashCommandHandler';

export const command = new ContextMenuCommandBuilder()
    .setName('View hero')
    .setContexts(InteractionContextType.PrivateChannel)

export async function execute(payload, env, ctx) {
    return reply('Hello world')
}
