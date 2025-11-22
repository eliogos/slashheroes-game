import { ComponentType, InteractionResponseType } from 'discord-api-types/payloads';
import { handleButton } from './buttons/buttonHandler.js';

export async function handleComponent(payload, env, ctx) {
  const { data } = payload;
  const componentType = data?.component_type;

  console.log('Component interaction received:', data?.custom_id, 'type:', componentType);

  switch (componentType) {
    case ComponentType.Button:
      return await handleButton(payload, env, ctx);

    default:
      console.warn(`Unknown component type: ${componentType}`);
      return new Response(JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Unknown component type: ${componentType}`
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}