import { verifySignature } from './_main/verifySign.js';
import { InteractionType } from 'discord-api-types/payloads';
import { routes } from './_main/router.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Not found', { status: 404 });
    }

    // Verify the request is from Discord
    const signature = request.headers.get('x-signature-ed25519');
    const timestamp = request.headers.get('x-signature-timestamp');
    const bodyText = await request.text(); // Get body as text for verification

    if (!signature || !timestamp) {
      return new Response('⚠️ Missing signature', { status: 401 });
    }

    const isValid = await verifySignature(signature, timestamp, bodyText, env.DISCORD_PUBLIC_KEY);
    if (!isValid) {
      return new Response('❌ Bad signature', { status: 401 });
    }

    // Parse body and handle Pings
    let payload;
    try {
      payload = JSON.parse(bodyText);
    } catch (e) {
      return new Response('❌ Invalid JSON', { status: 400 });
    }

    if (payload.type === InteractionType.Ping) {
      return new Response(JSON.stringify({ type: InteractionType.Ping }), {
				headers: { 'Content-Type': 'application/json' },
			});
    }

    // 4. Pass path to the handler
    const handler = routes[url.pathname];

    if (handler) {
      return handler(payload, env, ctx);
    }

    return new Response('Not found', { status: 404 });
  },
};