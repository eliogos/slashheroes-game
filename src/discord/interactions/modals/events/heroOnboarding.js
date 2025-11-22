import { InteractionResponseType } from 'discord-api-types/payloads/v10';
import { ContainerBuilder, TextDisplayBuilder } from '@discordjs/builders';

export async function handleHeroOnboarding(payload, env, ctx) {
  try {
    console.log('📝 Received hero setup submission');

    const userId = payload.member?.user?.id || payload.user?.id;
    const values = payload.data.components.flatMap(r =>
      (r.component ? [r.component] : r.components).map(c => ({
        id: c.custom_id,
        value: c.values ? c.values[0] : c.value
      }))
    );

    const raceId = values.find(v => v.id === 'selected_race')?.value;
    const classId = values.find(v => v.id === 'selected_class')?.value;
    const notes = values.find(v => v.id === 'onboarding_notes')?.value || '';

    if (!raceId || !classId) {
      console.warn('⚠️ Missing race or class in submission');
      return new Response('Missing fields', { status: 400 });
    }

    // Update player's selected race and class
    await env.DB.prepare(`
      UPDATE players
      SET hero_race_id = ?, hero_class_id = ?
      WHERE player_id = ?
    `).bind(raceId, classId, userId).run();

    // Fetch related data
    const race = await env.DB.prepare(`SELECT * FROM hero_races WHERE id = ?`).bind(raceId).first();
    const heroClass = await env.DB.prepare(`SELECT * FROM hero_classes WHERE id = ?`).bind(classId).first();
    const statsRows = await env.DB.prepare(`SELECT * FROM hero_stats`).all();

    // Compute total stats dynamically
    const computed = {};

    for (const stat of statsRows.results || []) {
      if (!stat.shortcode || stat.shortcode === 'HUN') continue; // Skip invalid stats and unchangeable HUN

      const key = stat.shortcode.toUpperCase(); // e.g. 'HP'
      const base = stat.default_value ?? 0;
      const raceMod = race[`${stat.shortcode.toLowerCase()}_mod`] ?? 0;
      const classMod = heroClass[`${stat.shortcode.toLowerCase()}_mod`] ?? 0;

      // Apply formula: total = base + (raceMod * 10) + (classMod * 10)
      const total = base + (raceMod * 10) + (classMod * 10);

      computed[key] = total;
    }

    console.log(`✅ ${userId} set race=${race.name}, class=${heroClass.name}`);

    // Build the updated message using builders
    const summaryContent = `### ${race.name}\n-# ${heroClass.name}\n${Object.entries(computed)
      .map(([k, v]) => `**${k}**: ${v}`)
      .join(' | ')}`;

    const container = new ContainerBuilder().addTextDisplayComponents(
      new TextDisplayBuilder().setContent(summaryContent)
    );

    // The response to a modal submission is to update the original message
    return new Response(JSON.stringify({
      type: InteractionResponseType.UpdateMessage,
      data: {
        components: [container.toJSON()],
      },
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    console.error('💥 Error submitting hero setup modal:', err);
    // It's good practice to let the user know something went wrong ephemerally
    return new Response(JSON.stringify({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'There was an error processing your character setup. Please try again.',
        flags: 64, // Ephemeral
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
