import { verifySignature } from './_main/verifySign.js';
import { InteractionType } from 'discord-api-types/payloads';
import { routes } from './_main/router.js'

// Attempt to write raw request body to a persistent store for debugging.
// Order of attempts: KV (`env.LOG_KV`), R2 (`env.LOG_R2`), local file system (Node),
// then fallback to console (truncated).
async function dumpRawPayload(bodyText, env) {
  const id = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  const key = `raw-payload-${id}-${rand}`;

  // 1) Try KV (requires a KV binding named LOG_KV)
  try {
    if (env && env.LOG_KV && typeof env.LOG_KV.put === 'function') {
      await env.LOG_KV.put(key, bodyText);
      console.log(`Raw payload written to KV as ${key}`);
      return `kv:${key}`;
    }
  } catch (e) {
    console.warn('Failed to write raw payload to KV', e);
  }

  // 2) Try R2 (requires an R2 binding named LOG_R2)
  try {
    if (env && env.LOG_R2 && typeof env.LOG_R2.put === 'function') {
      // R2 put supports a string body
      await env.LOG_R2.put(key, bodyText);
      console.log(`Raw payload written to R2 as ${key}`);
      return `r2:${key}`;
    }
  } catch (e) {
    console.warn('Failed to write raw payload to R2', e);
  }

  // 3) Try local filesystem (only works when running under Node with fs available)
  try {
    if (typeof process !== 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      const logsDir = path.resolve(process.cwd(), 'logs');
      await fs.promises.mkdir(logsDir, { recursive: true });
      const filePath = path.join(logsDir, `${key}.json`);
      await fs.promises.writeFile(filePath, bodyText, 'utf8');
      console.log(`Raw payload written to file ${filePath}`);
      return filePath;
    }
  } catch (e) {
    console.warn('Failed to write raw payload to local file', e);
  }

  // 4) Last resort: log a truncated preview to console
  try {
    const preview = bodyText.length > 2000 ? bodyText.slice(0, 2000) + '...<truncated>' : bodyText;
    console.error('Raw payload preview (truncated):', preview);
  } catch (e) {
    // ignore
  }

  return null;
}

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

    // Dump raw payload for debugging/inspection. This runs async so it doesn't
    // block the response; it attempts KV -> R2 -> local file -> console.
    try {
      if (ctx?.waitUntil) {
        ctx.waitUntil(dumpRawPayload(bodyText, env));
      } else {
        // fallback if ctx.waitUntil isn't available
        void dumpRawPayload(bodyText, env);
      }
    } catch (e) {
      console.warn('Failed to schedule raw payload dump', e);
    }

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