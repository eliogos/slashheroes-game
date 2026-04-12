import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionContextType } from 'discord-api-types/payloads/v10';
import { MessageFlags } from 'discord-api-types/v10';
import { defer, followUp } from '../slashCommandHandler.js';
import {
  getSeasonInfo,
  getServerEnvironment,
  getChannelRoom,
  getOutcomeRates,
  sampleOutcome,
  DEFAULT_SEASON_EPOCH_MS,
} from '../../../../../data/dungeon/index.js';

export const command = new SlashCommandBuilder()
  .setName('explore')
  .setDescription('Explore the dungeon room you are in.')
  .setContexts([InteractionContextType.Guild]);

// ── Constants ─────────────────────────────────────────────────────────────────

const DISCORD_EPOCH = 1420070400000;
const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

/** Seconds a player must wait between /explore uses. */
const EXPLORE_COOLDOWN_SECONDS = 30;

/**
 * Standard guild text-channel types that support dungeon exploration.
 * Threads, voice, stage, forums, etc. are excluded.
 */
const ALLOWED_CHANNEL_TYPES = new Set([
  0,  // GUILD_TEXT
  5,  // GUILD_ANNOUNCEMENT
]);

// Permission flag bits
const SEND_MESSAGES = 2048n; // 1n << 11n — used only for rules channel detection

/**
 * Name patterns that strongly suggest a read-only rules/info channel.
 * Matched against the lowercased channel name.
 */
const RULES_CHANNEL_PATTERNS = [
  /\brules?\b/,
  /\bguidelines?\b/,
  /\btos\b/,
  /\bterms\b/,
  /\bcode.?of.?conduct\b/,
  /\bserver.?info\b/,
  /\bannouncements?\b/,
  /\binfo\b/,
];

// ── Helpers ───────────────────────────────────────────────────────────────────

// ── Cooldown (Cloudflare Cache API) ───────────────────────────────────────────
// Per-user, globally consistent within a datacenter. No bindings required.
// Worst case: a user could bypass by hitting a different CF datacenter, but
// that's acceptable for a game cooldown.

function cooldownCacheKey(userId) {
  return new Request(`https://cooldown.slashheroes.internal/explore/${userId}`);
}

/** Returns seconds remaining on the cooldown, or 0 if none. */
async function getCooldownRemaining(userId) {
  try {
    const cached = await caches.default.match(cooldownCacheKey(userId));
    if (!cached) return 0;
    const expiresAt = parseInt(cached.headers.get('X-Expires-At') ?? '0', 10);
    return Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
  } catch {
    return 0; // fail open — don't block players on cache errors
  }
}

/** Stamps a cooldown for the user. Call this once the command is processed. */
async function setCooldown(userId) {
  try {
    const expiresAt = Date.now() + EXPLORE_COOLDOWN_SECONDS * 1000;
    await caches.default.put(
      cooldownCacheKey(userId),
      new Response('1', {
        headers: {
          'Cache-Control': `max-age=${EXPLORE_COOLDOWN_SECONDS}`,
          'X-Expires-At': String(expiresAt),
        },
      }),
    );
  } catch {
    // non-fatal — cooldown just won't be enforced for this use
  }
}

/** Returns true if a Discord snowflake is older than 3 days. */
function isOldEnough(snowflake) {
  if (!snowflake) return true;
  const timestamp = Number(BigInt(snowflake) >> 22n) + DISCORD_EPOCH;
  return Date.now() - timestamp > THREE_DAYS_IN_MS;
}


/**
 * Best-effort check for rules/info channels.
 *
 * Two signals — both must fire to block:
 *   1. Channel name matches a known rules-channel pattern.
 *   2. SEND_MESSAGES is absent from member.permissions OR the channel type
 *      is GUILD_ANNOUNCEMENT (5) — announcement channels are read-only by
 *      default and commonly used for rules/info.
 *
 * Signal 2 alone would miss admins (who have SEND_MESSAGES everywhere).
 * Signal 1 alone would be too broad (a "rulebook" gaming channel would match).
 * Together they give a reasonable best-effort without an API call.
 *
 * NOTE: The only definitive check is guild.rules_channel_id from the REST API,
 * which is unavailable to user-installed apps.
 */
function isLikelyRulesChannel(channelName, channelType, memberPermissions) {
  const name = (channelName ?? '').toLowerCase();
  const nameMatches = RULES_CHANNEL_PATTERNS.some(re => re.test(name));
  if (!nameMatches) return false;

  // Announcement channel type is always read-only
  if (channelType === 5) return true;

  // Regular text channel: check if SEND_MESSAGES is absent (read-only for this member)
  try {
    const perms = BigInt(memberPermissions ?? '0');
    const canSend = (perms & SEND_MESSAGES) === SEND_MESSAGES;
    return !canSend;
  } catch {
    return false;
  }
}

// ── Command handler ───────────────────────────────────────────────────────────

export async function execute(interaction, env, ctx) {
  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(processExplore(interaction, env));
  } else {
    processExplore(interaction, env).catch(err =>
      console.error('[explore] Unhandled error in processExplore:', err),
    );
  }
  return defer(true);
}

async function processExplore(interaction, env) {
  console.log('[explore] Full interaction payload', JSON.stringify(interaction, null, 2));

  try {
    const userId    = interaction.member?.user?.id;
    const serverId  = interaction.guild_id;
    const channelId = interaction.channel_id;
    const channel   = interaction.channel ?? {};

    // ── Cooldown check ─────────────────────────────────────────────────────
    const remaining = await getCooldownRemaining(userId);
    if (remaining > 0) {
      await followUp(interaction, {
        content: `You're moving too fast. Rest for **${remaining}s** before exploring again.`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    // Stamp cooldown immediately so rapid double-fires are blocked
    await setCooldown(userId);

    // ── Channel type check ─────────────────────────────────────────────────
    if (!ALLOWED_CHANNEL_TYPES.has(channel.type)) {
      await followUp(interaction, {
        content: 'Exploration only works in standard text channels.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    // ── Rules channel check ────────────────────────────────────────────────
    const memberPermissions = interaction.member?.permissions;
    if (isLikelyRulesChannel(channel.name, channel.type, memberPermissions)) {
      await followUp(interaction, {
        content: "This channel is off-limits for exploration.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    // ── Age checks ─────────────────────────────────────────────────────────
    if (!isOldEnough(serverId)) {
      await followUp(interaction, {
        content: 'This server is too new to explore. Try again in a few days.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    if (!isOldEnough(channelId)) {
      await followUp(interaction, {
        content: 'This channel is too new to explore. Try again in a few days.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    // ── Season + environment ───────────────────────────────────────────────
    const epochMs = env.SEASON_EPOCH ? Date.parse(env.SEASON_EPOCH) : DEFAULT_SEASON_EPOCH_MS;
    const seasonInfo = getSeasonInfo(new Date(), epochMs);
    const serverEnv  = await getServerEnvironment(serverId, seasonInfo);

    // ── Room generation + outcome roll ─────────────────────────────────────
    const room = await getChannelRoom(channelId, serverId, seasonInfo);
    const visitSeed = interaction.id;
    const rolledOutcome = await sampleOutcome(channelId, serverId, visitSeed, seasonInfo);

    // ── Logging ────────────────────────────────────────────────────────────
    console.log('[explore] Server Info', {
      serverId,
      seasonNumber: seasonInfo.seasonNumber,
      isBreak: seasonInfo.isBreak,
      dayInCycle: seasonInfo.dayInCycle,
      daysUntilChange: seasonInfo.daysUntilChange,
      cycleStartDate: seasonInfo.cycleStartDate.toISOString(),
      nextSeasonStartDate: seasonInfo.nextSeasonStartDate.toISOString(),
      region: {
        id: serverEnv.region.id,
        name: serverEnv.region.name,
        elementalAffinity: serverEnv.region.elementalAffinity,
        baseDifficulty: serverEnv.region.baseDifficulty,
        temperature: serverEnv.region.temperature,
        lightLevel: serverEnv.region.lightLevel,
        atmosphere: serverEnv.region.atmosphere,
        lootQuality: serverEnv.region.lootQuality,
        roomWeightModifiers: serverEnv.region.roomWeightModifiers,
      },
    });

    console.log('[explore] Channel Info', {
      channelId,
      channelName: channel.name ?? 'unknown',
      channelType: channel.type,
      parentId: channel.parent_id ?? null,
      appPermissions: interaction.app_permissions,
      memberPermissions,
      rolledOutcome,
      room: {
        type: room.type,
        name: room.name,
        description: room.description,
        possibleOutcomes: room.possibleOutcomes,
      },
    });

    // ── Build reply text ───────────────────────────────────────────────────
    const seasonStatus = seasonInfo.isBreak
      ? `Break — Season ${seasonInfo.seasonNumber + 1} starts in ${seasonInfo.daysUntilChange} day(s)`
      : `Season ${seasonInfo.seasonNumber} — ${seasonInfo.daysUntilChange} day(s) until break`;

    const serverLine =
      `**Server** \`${serverId}\`\n` +
      `→ Region: **${serverEnv.region.name}**\n` +
      `→ Element: ${serverEnv.region.elementalAffinity} | Difficulty: ${serverEnv.region.baseDifficulty} | Loot: ${serverEnv.region.lootQuality}\n` +
      `→ Atmosphere: ${serverEnv.region.atmosphere} | ${seasonStatus}`;

    const outcomeRates = getOutcomeRates(room.type);
    const outcomesLine = outcomeRates
      .map(({ outcome, pct }) => `${outcome} (${pct}%)`)
      .join(', ');

    const rolledRate = outcomeRates.find(r => r.outcome === rolledOutcome);
    const rolledLine = `→ Rolled: **${rolledOutcome}** (${rolledRate?.pct ?? '?'}% chance)`;

    const channelLine =
      `\n**Channel** \`${channelId}\`\n` +
      `→ Room: **${room.name}** (\`${room.type}\`)\n` +
      `→ ${room.description}\n` +
      `→ Possible outcomes: ${outcomesLine}\n` +
      rolledLine;

    await followUp(interaction, {
      content: serverLine + channelLine,
      flags: MessageFlags.Ephemeral,
    });
  } catch (err) {
    console.error('[explore] Error:', err);
    await followUp(interaction, {
      content: '❌ Something went wrong while exploring the dungeon.',
      flags: MessageFlags.Ephemeral,
    }).catch(() => {});
  }
}
