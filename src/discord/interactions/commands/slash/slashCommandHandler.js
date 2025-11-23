import { ButtonBuilder, ContainerBuilder, SectionBuilder } from '@discordjs/builders';
import { ButtonStyle, InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import { Colors } from '../../../../branding/colors.js';

/**
 * Standard JSON response wrapper.
 * @param {object} data 							- The data to be sent in the response.
 * @returns {Response}
 */
function jsonResponse(data) {
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	})
}

// #region Discord reply functions
/**
 * Defer reply
 * @param {boolean} [ephemeral=false] - Only the sender can see the message.
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
 * Reply immediately to the command.
 * @param {string|object} content 	 	- Message content or full body.
 * @param {boolean} [ephemeral=false] - Only the sender can see the message.
 * @returns {Response}
 */
export function reply(content, ephemeral = false) {
	const data =
		typeof content === 'string'
		? { content }
		: { ...content };

	if (ephemeral) {
		data.flags = MessageFlags.Ephemeral;
	}

	return jsonResponse({
		type: InteractionResponseType.ChannelMessageWithSource,
		data,
	});
}

/**
 * Sends a request to a Discord webhook.
 * @param {object} interaction	 		 - The interaction payload.
 * @param {object} body 						 - The request body.
 * @param {string} method 					 - The HTTP method.
 * @param {string} [endpoint=''] 		 - Path
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
 * Edits the original reply.
 * @param {object} interaction				- The interaction payload.
 * @param {object} body								- New message body.
 */
export function editReply(interaction, body) {
	return webhookRequest(interaction, body, 'PATCH', '/messages/@original');
}

/**
 * Sends a follow-up message.
 * @param {object} interaction				- The interaction payload.
 * @param {object} body								- New message body.
 */
export function followUp(interaction, body) {
	return webhookRequest(interaction, body, 'POST');
}

/**
 * Error reply with a custom theme.
 * @param {string} header - Error header text. Defaults to 'An error occured'.
 * @param {string[]} details - Array of error detail strings (up to 5).
 * @param {string} [supportLink] - Optional support server link.
 * @param {string} [email] - Optional support email.
 * @returns {Array} Components array for reply/editReply.
 */
export function errorReply(
  header = "An error occurred",
  details = ["Unexpected error"],
  supportLink = "https://discord.com",
  email = "einsturd@gmail.com",
) {
  // Generate a Unix timestamp (milliseconds → seconds)
  const timestamp = Math.floor(Date.now() / 1000);

  const section = new SectionBuilder()
    .setButtonAccessory(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Report bug")
        .setCustomId(`modal_bugreport_${timestamp}`),
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`# ${header}`),
      new TextDisplayBuilder().setContent(
        `[Join Support Server](${supportLink}) • <mailto:${email}>`,
      ),
    );

  const container = new ContainerBuilder()
    .setAccentColor(Colors.Error)
    .addSectionComponents(section)
    .addSeparatorComponents(
      new SeparatorBuilder()
        .setSpacing(SeparatorSpacingSize.Small)
        .setDivider(true),
    );

  // Up to 5 detail blocks
  details.slice(0, 5).forEach((detail) => {
    container.addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`\`\`\`\n${detail}\n\`\`\``),
    );
  });

  return [container];
}

// #endregion

export { Colors }

/**
 * Handle incoming slash (chat input) commands by loading the matching module
 * and calling its `execute` function.
 */
export async function handleSlashCommand(payload, env, ctx) {
	const name = payload.data?.name?.toLowerCase().replace(/\s+/g, '-');

	try {
		// Import the commands index so esbuild can statically include modules.
		const commandsIndex = await import('./index.js');

		// Direct match (exports use the same name as command files for list/*)
		let commandModule = commandsIndex[name];

		// Fallback: convert dash-case to camelCase (e.g. view-hero -> viewHero)
		if (!commandModule && name.includes('-')) {
			const camel = name.split('-').map((p, i) => i === 0 ? p : p[0].toUpperCase() + p.slice(1)).join('');
			commandModule = commandsIndex[camel];
		}

		if (!commandModule) {
			// As a last resort, try to load a module from user/list directly (note: dynamic imports
			// with unknown paths can fail during build; keep this attempt but handle errors).
			try {
				commandModule = await import(`../user/list/${name}.js`);
			} catch (e) {
				// ignore — we'll handle below
			}
		}

		if (!commandModule || typeof commandModule.execute !== 'function') {
			console.warn(`⚠️ Slash command "${name}" is missing an execute() function.`);
			return new Response(
				JSON.stringify({ type: 4, data: { content: 'Invalid command module', flags: 64 } }),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const result = await commandModule.execute(payload, env, ctx);

		if (result instanceof Response) return result;

		return new Response(JSON.stringify(result ?? {}), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		console.error(`❌ Failed to handle slash command "${name}":`, err);
		return new Response(
			JSON.stringify({ type: 4, data: { content: 'An unexpected error occurred.', flags: 64 } }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	}
}