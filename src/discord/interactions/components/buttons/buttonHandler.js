import { InteractionResponseType, MessageFlags } from 'discord-api-types/payloads/v10';
import { showHeroOnboardingModal } from './events/onboarding.js';

export async function handleButton(payload, env, ctx) {
  const customId = payload.data?.custom_id;

  switch (customId) {
    case 'modal_onboarding':
      return showHeroOnboardingModal(payload, env, ctx);

    default:
      return new Response(JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Sorry, I don't recognize this button: ${customId}`,
          flags: MessageFlags.Ephemeral,
        }
      }), { headers: { 'Content-Type': 'application/json' } });
  }
}