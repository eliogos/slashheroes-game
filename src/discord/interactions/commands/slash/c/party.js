import { MessageFlags } from 'discord-api-types/payloads/v10';
import { sendFollowUp } from '../slashHandler.js';

export const command = {
    name: "party",
    description: "Send an invite to your party",
    type: 1,
    contexts: [0, 1, 2] 
};

export async function execute(payload, env, ctx) {
    const isGroupDM = (payload?.channel?.type ?? 0) === 3;

    if (!isGroupDM) {
        ctx.waitUntil(
            sendFollowUp(
                payload,
                {
                    flags: MessageFlags.Ephemeral,
                    content: "❌ This command only works in Group DMs."
                },
                true
            )
        );
        return { type: 5 };
    }

    ctx.waitUntil(
        sendFollowUp(
            payload,
            {
                flags: MessageFlags.Ephemeral,
                content: "Party invite sent test"
            },
            true
        )
    );

    return { type: 5 };
}
