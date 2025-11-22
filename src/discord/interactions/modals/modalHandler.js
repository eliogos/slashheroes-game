import { InteractionResponseType, MessageFlags } from 'discord-api-types/payloads/v10';
import { handleHeroOnboarding } from './index.js';

export async function handleModalSubmit(payload, env, ctx) {
  const { data } = payload;
  const customId = data?.custom_id;

  console.log('🪟 Modal submitted:', customId);

  switch (customId) {
    case 'hero_onboarding_modal':
      return await handleHeroOnboarding(payload, env, ctx);

    default:
      return new Response(JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Sorry, I don't recognize this modal submission: ${customId}`,
          flags: MessageFlags.Ephemeral,
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
  }
}
