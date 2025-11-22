import { ApplicationCommandType } from 'discord-api-types/payloads/v10';

export const command = {
    name: 'View Hero',
    type: ApplicationCommandType.User
};

export async function execute(payload, env, ctx) {
    return {
        type: 4,
        data: {
            content: 'Hello World',
            flags: 64
        }
    }
}
