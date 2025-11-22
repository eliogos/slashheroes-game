import pkg from '../../../../../../package.json' with { type: 'json' };

// Discord command definition
export const command = {
  name: 'version',
  description: 'Displays the current version of the bot.',
  type: 1
};

// Execute slash command
export async function execute(payload, env, ctx) {
  return {
    type: 4,
    data: { content: `SlashHeroes Bot Version: **${pkg.version}**` }
  };
}
