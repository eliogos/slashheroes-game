import { handleSlashCommand } from './slash/slashHandler.js';
import { handleUserCommand } from './user/userCommandHandler.js';
import { handleMessageCommand } from './message/messageCommandHandler.js';
import { ApplicationCommandType } from 'discord-api-types/payloads';

/**
 * Handles Discord commands of all types (Slash, User, Message)
 */
export async function handleCommand(payload, env, ctx) {
  const { data } = payload;
  const commandType = data.type;

  switch (commandType) {
    case ApplicationCommandType.ChatInput:
      return await handleSlashCommand(payload, env, ctx);

    case ApplicationCommandType.User:
      return await handleUserCommand(payload, env, ctx);

    case ApplicationCommandType.Message:
      return await handleMessageCommand(payload, env, ctx);

    case ApplicationCommandType.PrimaryEntryPoint:
      return new Response('Primary Entry Point command not supported', { status: 200 });

    default:
      console.warn(`⚠️ Unknown command type: ${commandType}`);
      return new Response('Unknown command type', { status: 400 });
  }
}
