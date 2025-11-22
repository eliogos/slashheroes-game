import * as slashCommands from '../src/discord/interactions/commands/slash/index.js';


const APPLICATION_ID = process.env.APPLICATION_ID;
const DISCORD_TOKEN = process.env.DISCORD_APP_TOKEN;

if (!APPLICATION_ID || !DISCORD_TOKEN) {
  console.error('Missing APPLICATION_ID or DISCORD_APP_TOKEN environment variables');
  process.exit(1);
}

const commands = [];

// Get the command definitions from the imported modules
for (const commandModule of Object.values(slashCommands)) {
  commands.push(commandModule.command);
}

// User commands soon

const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

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
