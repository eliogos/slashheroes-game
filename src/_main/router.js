import { discord } from '../discord/index.js';

/**
 * Handles the Discord authorization events
 *   Checks if the request is signed and fresh
 *   then proceeds with the authorization
 * 
 * @param {object} payload The parsed JSON payload from the request.
 * @param {object} env Secrets, Variables and Keys from the Worker. Do not expose.
 * @param {object} ctx Execution context.
 * @returns {Promise<Response>}
 */
async function handleAuthEvent(payload, env, ctx){
	
	const event_type = payload?.event?.type;
	const player = payload?.event?.data?.user;

	if (event_type && player.id) {
		const player_id = player.id;
		const result = await discord.auth(event_type, player_id, env);
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	return new Response('Invalid request', { status: 400});	
}

export const routes = {
	'/api/interactions': discord.handleInteraction,
	'/events': handleAuthEvent,
}