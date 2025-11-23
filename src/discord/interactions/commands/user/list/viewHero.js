import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { reply } from '../../slash/slashCommandHandler';

export const command = new ContextMenuCommandBuilder()
    .setName('View hero');

export async function execute(payload, env, ctx) {
    return reply('Hello world')
}
