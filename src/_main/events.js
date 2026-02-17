import { discord } from '../discord/index.js';

export async function handleApiEvents(c) {
	const payload = c.get('payload');
	const eventType = payload?.event?.type;
	const player = payload?.event?.data?.user;

	if (eventType && player?.id) {
		const result = await discord.auth(eventType, player.id, c.env);
		return c.json(result, 200);
	}

	return c.text('Invalid request', 400);
}
