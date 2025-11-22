import { ButtonBuilder, ButtonStyle, ContainerBuilder, SectionBuilder, TextDisplayBuilder } from "@discordjs/builders";
import { MessageFlags } from 'discord-api-types/payloads/v10';

export async function discordAuth(event_type, player_id, env) {
	let components = null;
	const now = new Date().toISOString();

	if (event_type === 'APPLICATION_AUTHORIZED') {
		try {
			const existing = await env.DB.prepare(
				`SELECT player_id FROM players WHERE player_id = ?`
			).bind(player_id).first();

			if (!existing) {
				await env.DB.prepare(
					`INSERT INTO players (player_id, hero_race_id, hero_class_id, joined_at, updated_at)
					VALUES (?, ?, ?, ?, ?)`
				).bind(player_id, 1, 1, now, now).run();

				// Prepare message for Discord:
				components = [
					new ContainerBuilder()
						.setAccentColor(0xF1C40F)
						.addSectionComponents(
							new SectionBuilder()
								.setButtonAccessory(
									new ButtonBuilder()
										.setStyle(ButtonStyle.Primary)
										.setLabel('Set Hero')
										.setCustomId('modal_onboarding')
								)
								.addTextDisplayComponents(
									new TextDisplayBuilder()
										.setContent(
											'# Welcome to SLASHHEROES\n'
											+ 'Race to become the greatest dungeooner on Discord.\n'
											+ 'Fight enemies, hunt monsters, obtain loot, join a party, solve quests and survive!'
										),
									new TextDisplayBuilder()
										.setContent(
											'-# Click on the button to choose your race and class.'
										)
						        )
						),
				];

				console.log('attempting sendDM', { player_id, containerSnippet: JSON.stringify(components[0]).slice(0, 200) });
				await sendDM(player_id, components, env);

				return { status: 'AUTHORIZED', new: true, component: components };
			}

			await env.DB.prepare(
				`UPDATE players SET updated_at = ?, last_active = ? WHERE player_id = ?`
			).bind(now, now, player_id).run();
				
			console.log(`Player ${player_id} reauthorized`);
			return { status: 'authorized', new: false };

		}
		catch (e) {
			console.error('Authorization error', player_id, components, e);
      return { status: 'error', error: e }
		}
	}

	else if (event_type === 'APPLICATION_UNAUTHORIZED') {
		try {
            await env.DB.prepare(`DELETE FROM players WHERE player_id = ?`).bind(player_id).run();
                console.log(`🚪 Player ${player_id} deauthorized and removed`);
                return { status: 'deauthorized' };
		} catch (e) {
				console.error('Deauthorization error', player_id, e);
				return { status: 'error', error: e };
		}
	}

	return null;
}

const base = 'https://discord.com/api/v10';

async function sendDM(player_id, components, env) {
	if (!player_id || !env.DISCORD_APP_TOKEN) return;

	const headers = { 'Authorization': `Bot ${env.DISCORD_APP_TOKEN}`, 'Content-Type': 'application/json'};

	try {
		const dmRes = await fetch(`${base}/users/@me/channels`, {
			method: 'POST',
			headers,
			body: JSON.stringify({ recipient_id: player_id })
		});

		const dmResTxt = await dmRes.text().catch(() => '');

		if (!dmRes.ok) {
			console.error('Could not create DM', dmRes.status, dmResTxt.slice(0, 800));
			return
		}

		let dm;
		try {
			dm = JSON.parse(dmResTxt);
		} catch (e) {
			console.error('create DM parse error', e, dmResTxt.slice(0, 800));
			return
		}

		const sendRes = await fetch(`${base}/channels/${dm.id}/messages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            flags: MessageFlags.IsComponentsV2,
            components: components
        })
    });

    const sendResText = await sendRes.text().catch(() => '');
    console.log('send message response', { status: sendRes.status, ok: sendRes.ok, body: sendResText.slice(0, 800) });

    if (!sendRes.ok) {
        console.error('send DM failed', sendRes.status, sendResText.slice(0, 800));
    }

	} catch (e) {
		console.error('create DM error', e);
	}
}