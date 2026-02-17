import { InteractionType } from 'discord-api-types/payloads/v10';
import { verifySignature } from './verifySign.js';

export async function middleware(c, next) {
	const signature = c.req.header('x-signature-ed25519');
	const timestamp = c.req.header('x-signature-timestamp');
	const bodyText = await c.req.text();

	if (!signature || !timestamp) {
		return c.text('Missing signature', 401);
	}

	const isValid = await verifySignature(signature, timestamp, bodyText, c.env.DISCORD_PUBLIC_KEY);
	if (!isValid) {
		return c.text('Bad signature', 401);
	}

	let payload;
	try {
		payload = JSON.parse(bodyText);
	} catch {
		return c.text('Invalid JSON', 400);
	}

	if (payload.type === InteractionType.Ping) {
		return c.json({ type: InteractionType.Ping });
	}

	c.set('payload', payload);
	await next();
}
