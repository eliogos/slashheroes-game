import { ModalBuilder, StringSelectMenuBuilder, TextDisplayBuilder, LabelBuilder } from "@discordjs/builders";
import { InteractionResponseType } from "discord-api-types/payloads/v10";

export async function showHeroOnboardingModal(payload, env, ctx) {
  // Fetch available races and classes from the database
  const races = await env.DB.prepare('SELECT id, name, emoji, summary FROM hero_races').all();
  const classes = await env.DB.prepare('SELECT id, name, emoji, summary FROM hero_classes').all();

  const modal = new ModalBuilder()
    .setCustomId('setup_hero_modal_submit')
    .setTitle('Set up your hero');

  // Create select menu options from the database results
  const raceOptions = races.results.map(r => ({
    label: r.name,
    value: String(r.id),
    description: r.summary?.slice(0, 100) || null,
    emoji: r.emoji ? { name: r.emoji } : undefined,
  }));

  const classOptions = classes.results.map(c => ({
    label: c.name,
    value: String(c.id),
    description: c.summary?.slice(0, 100) || null,
    emoji: c.emoji ? { name: c.emoji } : undefined,
  }));

  const raceSelect = new StringSelectMenuBuilder()
    .setCustomId('selected_race')
    .setPlaceholder('Choose your Race')
    .addOptions(raceOptions.slice(0, 25));

  const classSelect = new StringSelectMenuBuilder()
    .setCustomId('selected_class')
    .setPlaceholder('Choose your Class')
    .addOptions(classOptions.slice(0, 25));

  const notesDisplay = new TextDisplayBuilder()
    .setContent('You cannot change this later. Choose wisely.');

  // Use LabelBuilder to structure the modal with V2 components
  modal.addLabelComponents(
    new LabelBuilder()
      .setLabel('Choose your Race')
      .setDescription('Your race determines your physical attributes.')
      .setStringSelectMenuComponent(raceSelect),
    new LabelBuilder()
      .setLabel('Choose your Class')
      .setDescription('Your class determines your role and skills.')
      .setStringSelectMenuComponent(classSelect),
  );

  modal.addTextDisplayComponents(
    notesDisplay
  )

  return new Response(JSON.stringify({
    type: InteractionResponseType.Modal,
    data: modal.toJSON(),
  }), { headers: { 'Content-Type': 'application/json' } });
}
