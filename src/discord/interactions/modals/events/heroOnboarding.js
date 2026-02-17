import { InteractionResponseType } from 'discord-api-types/payloads/v10';
import { ContainerBuilder, TextDisplayBuilder } from '@discordjs/builders';
import {
  computeHeroStats,
  getClassById,
  getRaceById,
  resolveClassStarterLoadout,
} from '../../../../data/presets/heroPresets.js';
import { buildHeroSaveSql, evaluateHeroSetup, getPlayerHeroState } from '../../../player/heroSetup.js';

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

    if (!raceId || !classId) {
      console.warn('⚠️ Missing onboarding fields in submission');
      return new Response('Missing fields', { status: 400 });
    }

    const race = getRaceById(raceId);
    const heroClass = getClassById(classId);
    if (!race || !heroClass) {
      return new Response('Invalid race or class selection', { status: 400 });
    }
    const starterLoadout = resolveClassStarterLoadout(heroClass, race);
    const starterWeapon = starterLoadout.weapon;
    const starterArmor = starterLoadout.armor;
    const starterArtifact = starterLoadout.artifact;
    const starterRing = starterLoadout.ring;
    const starterCarrier = starterLoadout.carrier;
    const starterBag = starterLoadout.bag;
    const starterLongrange = starterLoadout.longrange;
    const starterUtility = starterLoadout.utility;

    const { player, columns } = await getPlayerHeroState(env, userId);
    const heroState = evaluateHeroSetup(player, env, columns);
    if (heroState.reason === 'ok') {
      return new Response(JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: 'Your hero is already locked for this season.',
          flags: 64,
        }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    if (heroState.reason === 'missing_player') {
      return new Response(JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: heroState.message,
          flags: 64,
        }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const updateParts = buildHeroSaveSql(columns);
    await env.DB.prepare(updateParts.sql).bind(
      ...updateParts.bindingsBuilder(
        raceId,
        classId,
        userId,
        env,
        starterLoadout.weaponKey,
        starterLoadout.armorKey,
        starterLoadout.artifactKey,
        starterLoadout.ringKey,
        starterLoadout.carrierKey,
        starterLoadout.bagKey,
        starterLoadout.longrangeKey,
        starterLoadout.utilityKey,
      ),
    ).run();

    const computed = computeHeroStats(race, heroClass);

    console.log(`✅ ${userId} set race=${race.name}, class=${heroClass.name}`);

    // Build the updated message using builders
    const summaryContent = `### ${race.name}\n-# ${heroClass.name}\n**Starter Weapon** (Auto): ${starterWeapon?.name || 'None'}\n**Starter Armor** (Auto): ${starterArmor?.name || 'None'}\n**Starter Artifact**: ${starterArtifact?.name || 'None'}\n**Starter Ring**: ${starterRing?.name || 'None'}\n**Starter Carrier**: ${starterCarrier?.name || 'None'}\n**Starter Bag**: ${starterBag?.name || 'None'}\n**Starter Longrange**: ${starterLongrange?.name || 'None'}\n**Starter Utility**: ${starterUtility?.name || 'None'}\n${Object.entries(computed)
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
