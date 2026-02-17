import { discord } from '../discord/index.js';

export async function handleApiInteractions(c) {
	const payload = c.get('payload');
	return discord.handleInteraction(payload, c.env, c.executionCtx);
}
