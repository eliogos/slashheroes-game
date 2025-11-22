import { InteractionType } from 'discord-api-types/payloads/v10';
import { handleCommand } from './commands/commandHandler.js';
import { handleComponent } from './components/componentHandler.js';
import { handleAutocomplete } from './autocomplete/autocompleteHandler.js';
import { handleModalSubmit } from './modals/modalHandler.js';

export async function handleInteraction(payload, env, ctx) {
    const type = payload?.type;

    switch (type) {
        case InteractionType.ApplicationCommand:
            // Handles slash commands and context menu commands
            return await handleCommand(payload, env, ctx);
        
        case InteractionType.MessageComponent:
            // Handles button and dropdown interactions
            return await handleComponent(payload, env, ctx);

        case InteractionType.ApplicationCommandAutocomplete:
            // Handles slash command autocomplete option input
            return await handleAutocomplete(payload, env, ctx);

        case InteractionType.ModalSubmit:
            // Handles modal submissions
            return await handleModalSubmit(payload, env, ctx);

        default:
            console.warn(`UNKNOWN INTERACTION TYPE: ${type}`);
            return new Response('Unknown interaction type', { status: 400 });
    }
}
