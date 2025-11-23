import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { InteractionContextType } from 'discord-api-types/payloads/v10';

const APPLICATION_ID = process.env.APPLICATION_ID;
const DISCORD_TOKEN = process.env.DISCORD_APP_TOKEN;
const GUILD_ID = process.env.GUILD_ID; // optional: register to a guild for immediate updates
const DRY_RUN = process.env.DRY_RUN === '1';

if (!APPLICATION_ID || !DISCORD_TOKEN) {
  if (!DRY_RUN) {
    console.error('Missing APPLICATION_ID or DISCORD_APP_TOKEN environment variables');
    process.exit(1);
  }
}

// Scan the slash commands directory and extract basic command metadata (name/description)
// without importing project modules (avoids executing app code during registration).
const commandsDir = path.resolve(process.cwd(), 'src/discord/interactions/commands/slash/list');

async function extractCommandMetadata(filePath) {
  const src = await readFile(filePath, 'utf8');
  const nameMatch = src.match(/\.setName\(\s*['"`"]([^'"`]+)['"`"]\s*\)/);
  const descMatch = src.match(/\.setDescription\(\s*['"`"]([^'"`]+)['"`"]\s*\)/);
  const isContext = /ContextMenuCommandBuilder/.test(src);
  const name = nameMatch ? nameMatch[1] : null;
  const description = descMatch ? descMatch[1] : '';
  if (!name) return null;

  // Determine type: 1 = Chat Input, 2 = User, 3 = Message
  const type = isContext ? 2 : 1;

  // Try to read a sidecar .meta.json file first (allows full registration metadata without executing modules)
  let contexts = null;
  const metaPath = filePath.replace(/\.js$/, '.meta.json');
  try {
    const metaSrc = await readFile(metaPath, 'utf8');
    const meta = JSON.parse(metaSrc);
    // If meta provides contexts (array), use it; otherwise fall through to parsing from source
    if (Array.isArray(meta.contexts) && meta.contexts.length > 0) {
      contexts = meta.contexts;
    }
    // If meta contains name/description/type override, respect them
    if (meta.name) {
      // override name if provided in meta
    }
  } catch (err) {
    // no sidecar; ignore
  }

  // If we still don't have contexts, try to parse .setContexts([...]) from source
  if (!contexts) {
    const ctxMatch = src.match(/\.setContexts\(\s*\[([^\]]+)\]\s*\)/);
    if (ctxMatch) {
      const inside = ctxMatch[1];
      const parts = inside.split(',').map(s => s.trim()).filter(Boolean);
      const parsed = [];
      for (const p of parts) {
        // Example tokens: InteractionContextType.PrivateChannel or numeric literals like 1
        if (/InteractionContextType\./.test(p)) {
          const key = p.replace(/.*\./, '').replace(/[^A-Za-z0-9_]/g, '');
          if (InteractionContextType && InteractionContextType[key] !== undefined) {
            parsed.push(InteractionContextType[key]);
          }
        } else {
          const num = parseInt(p.replace(/[^0-9]/g, ''), 10);
          if (!Number.isNaN(num)) parsed.push(num);
        }
      }
      if (parsed.length) contexts = parsed;
    }
  }

  return { name, description, type, contexts };
}

const files = await readdir(commandsDir);
const commands = [];
for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const full = path.join(commandsDir, file);
  const meta = await extractCommandMetadata(full);
  if (meta) commands.push(meta);
}

let url;
if (GUILD_ID) {
  console.log(`Registering ${commands.length} commands to guild ${GUILD_ID}`);
  url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`;
} else {
  console.log(`Registering ${commands.length} global commands (may take up to 1 hour to propagate)`);
  url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;
}

if (DRY_RUN) {
  console.log('Dry run mode: generated payload will not be sent to Discord.');
  console.log(JSON.stringify(commands, null, 2));
  process.exit(0);
}

const response = await fetch(url, {
  method: 'PUT',
  headers: {
    'Authorization': `Bot ${DISCORD_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(commands),
});

if (response.ok) {
  const data = await response.json();
  console.log('Commands registered successfully:', data);
} else {
  console.error('Failed to register commands:', response.status, await response.text());
}
