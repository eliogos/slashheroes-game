import { ModalBuilder, TextInputBuilder, LabelBuilder } from "@discordjs/builders";
import { InteractionResponseType, TextInputStyle } from "discord-api-types/payloads/v10";

export async function showHeroOnboardingModal(payload, env, ctx) {
  // Fetch available races and classes from the database to use as placeholders
  const races = await env.DB.prepare('SELECT name FROM hero_races').all();
  const classes = await env.DB.prepare('SELECT name FROM hero_classes').all();

  const racePlaceholder = races.results.map(r => r.name).join(', ');
  const classPlaceholder = classes.results.map(c => c.name).join(', ');

  const modal = new ModalBuilder()
    .setCustomId('hero_onboarding_modal') // This ID is handled by our modals/handler.js
    .setTitle('Create Your Hero');

  const raceInput = new TextInputBuilder()
    .setCustomId('selected_race_name') // We'll look for this ID in the submission
    // .setLabel('Choose your Race') // Label is now handled by LabelBuilder
    .setPlaceholder(racePlaceholder)
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const classInput = new TextInputBuilder()
    .setCustomId('selected_class_name')
    // .setLabel('Choose your Class')
    .setPlaceholder(classPlaceholder)
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const notesInput = new TextInputBuilder()
    .setCustomId('onboarding_notes')
    // .setLabel('Notes')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(false);

  // Use LabelBuilder instead of ActionRowBuilder
  modal.addLabelComponents(
    new LabelBuilder()
      .setLabel('Choose your Race')
      .setTextInputComponent(raceInput),
    new LabelBuilder()
      .setLabel('Choose your Class')
      .setTextInputComponent(classInput),
    new LabelBuilder()
      .setLabel('Notes (Optional)')
      .setTextInputComponent(notesInput)
  );

  return new Response(JSON.stringify({
    type: InteractionResponseType.Modal,
    data: modal.toJSON(),
  }), { headers: { 'Content-Type': 'application/json' } });
}
