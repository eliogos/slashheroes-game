import * as slashCommands from '../src/discord/interactions/commands/slash/index.js';


const APPLICATION_ID = process.env.APPLICATION_ID;
const DISCORD_TOKEN = process.env.DISCORD_APP_TOKEN;
const GUILD_ID = process.env.GUILD_ID; // optional: register to a guild for immediate updates

if (!APPLICATION_ID || !DISCORD_TOKEN) {
  console.error('Missing APPLICATION_ID or DISCORD_APP_TOKEN environment variables');
  process.exit(1);
}

const commands = [];

// Get the command definitions from the imported modules
for (const commandModule of Object.values(slashCommands)) {
  const cmd = commandModule.command;
  // If the module exported a SlashCommandBuilder, call toJSON()
  if (cmd && typeof cmd.toJSON === 'function') {
    commands.push(cmd.toJSON());
  } else if (cmd) {
    commands.push(cmd);
  }
}

// User commands soon

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
