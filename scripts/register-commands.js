import { readdir, readFile } from 'fs/promises';
import path from 'path';

const APPLICATION_ID = process.env.APPLICATION_ID;
const DISCORD_TOKEN = process.env.DISCORD_APP_TOKEN;
const GUILD_ID = process.env.GUILD_ID; // optional: register to a guild for immediate updates

if (!APPLICATION_ID || !DISCORD_TOKEN) {
  console.error('Missing APPLICATION_ID or DISCORD_APP_TOKEN environment variables');
  process.exit(1);
}

// Scan the slash commands directory and extract basic command metadata (name/description)
// without importing project modules (avoids executing app code during registration).
const commandsDir = path.resolve(process.cwd(), 'src/discord/interactions/commands/slash/list');

async function extractCommandMetadata(filePath) {
  const src = await readFile(filePath, 'utf8');
  const nameMatch = src.match(/\.setName\(\s*['"`]([^'"`]+)['"`]\s*\)/);
  const descMatch = src.match(/\.setDescription\(\s*['"`]([^'"`]+)['"`]\s*\)/);
  const isContext = /ContextMenuCommandBuilder/.test(src);
  const name = nameMatch ? nameMatch[1] : null;
  const description = descMatch ? descMatch[1] : '';
  if (!name) return null;
  // Determine type: 1 = Chat Input, 2 = User, 3 = Message
  const type = isContext ? 2 : 1;
  return { name, description, type };
}

const files = await readdir(commandsDir);
const commands = [];
for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const base = file.slice(0, -3);
  const full = path.join(commandsDir, file);

  // Prefer a sidecar metadata JSON file (e.g. ping.meta.json) which can contain
  // the full registration payload including `contexts` to avoid executing code.
  const metaPath = path.join(commandsDir, `${base}.meta.json`);
  try {
    const raw = await readFile(metaPath, 'utf8');
    const obj = JSON.parse(raw);
    // Minimal validation: must have a name
    if (obj && obj.name) {
      commands.push(obj);
      continue;
    }
  } catch (e) {
    // no meta file or invalid JSON — fallback to source parsing
  }

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
