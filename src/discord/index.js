import { discordAuth } from './events/auth.js';
import { handleInteraction } from './interactions/interactionHandler.js';

export const discord = {
	auth: discordAuth,
	handleInteraction: handleInteraction,
}