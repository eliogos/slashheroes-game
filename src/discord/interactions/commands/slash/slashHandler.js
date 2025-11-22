import { InteractionResponseType, MessageFlags } from "discord-api-types/v10";

/**
 * Creates a standard JSON response.
 * @param {object} data - The data to be sent in the response.
 * @returns {Response}
 */
function jsonResponse(data) {
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

/**
 * Creates a deferred response.
 * @param {boolean} [ephemeral=false] - Whether the response should be ephemeral.
 * @returns {Response}
 */
export function defer(ephemeral = false) {
	const data = {};
	if (ephemeral) {
		data.flags = MessageFlags.Ephemeral;
	}

	return jsonResponse({
		type: InteractionResponseType.DeferredChannelMessageWithSource,
		data: Object.keys(data).length > 0 ? data : undefined,
	});
}

/**
 * Sends a request to a Discord webhook.
 * @param {object} interaction - The interaction payload.
 * @param {object} body - The request body.
 * @param {string} method - The HTTP method.
 * @param {string} [endpoint=''] - The endpoint to append to the webhook URL.
 */
async function webhookRequest(interaction, body, method, endpoint = '') {
	const { application_id, token } = interaction;
	const url = `https://discord.com/api/webhooks/${application_id}/${token}${endpoint}`;

	const response = await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error(`❌ Failed to ${method} webhook: ${response.status} ${response.statusText}`, errorText);
		throw new Error(`Failed to interact with webhook: ${errorText}`);
	}
	return response;
}

/**
 * Sends a follow-up message for an interaction.
 * @param {object} interaction - The interaction payload.
 * @param {object} body - The message body.
 */
export function sendFollowUp(interaction, body) {
	return webhookRequest(interaction, body, 'POST');
}

/**
 * Edits the original message of an interaction.
 * @param {object} interaction - The interaction payload.
 * @param {object} body - The new message body.
 */
export function editOriginal(interaction, body) {
	return webhookRequest(interaction, body, 'PATCH', '/messages/@original');
}

/**
 * Creates an ephemeral error response.
 * @param {string} [message='An error occurred.'] - The error message.
 * @returns {Response}
 */
function errorResponse(message = 'An unexpected error occurred.') {
	return jsonResponse({ type: 4, data: { content: message, flags: 64 } });
}

export async function handleSlashCommand(payload, env, ctx) {
  const name = payload.data?.name?.toLowerCase();
  
  try {
    let commandModule;

    try {
      commandModule = await import(`./c/${name}.js`);
    } catch {
      commandModule = await import(`./c/admin/${name}.js`);
    }

    if (typeof commandModule.execute !== "function") {
      console.warn(`⚠️ Command "${name}" is missing an execute() function.`);
      return errorResponse("This command is improperly configured.");
    }

    const result = await commandModule.execute(payload, env, ctx);

    if (result instanceof Response) return result;

    // For commands that return an object instead of a Response
    return jsonResponse(result ?? {});
  } catch (err) {
    console.error(`❌ Failed to handle slash command "${name}":`, err);
    return errorResponse("An unexpected error occurred while running this command.");
  }
}
