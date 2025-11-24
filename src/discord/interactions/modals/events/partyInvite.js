import { InteractionResponseType } from 'discord-api-types/payloads/v10';
import { MessageFlags } from 'discord-api-types/v10';

export async function handlePartyInvite(payload, env, ctx) {
  try {
    console.log('🎉 Received party invite submission');

    const userId = payload.member?.user?.id || payload.user?.id;
    
    // Extract selected users from the modal submission
    const values = payload.data.components.flatMap(r =>
      (r.component ? [r.component] : r.components).map(c => ({
        id: c.custom_id,
        value: c.values || []
      }))
    );

    const selectedUsers = values.find(v => v.id === 'selected_users')?.value || [];
    
    // Filter out the command user from invites
    const filteredUsers = selectedUsers.filter(id => id !== userId);

    if (filteredUsers.length === 0) {
      return new Response(JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: '❌ No valid users were selected. You cannot invite yourself!',
          flags: MessageFlags.Ephemeral,
        }
      }), { headers: { 'Content-Type': 'application/json' } });
    }

    console.log(`✅ User ${userId} invited: ${filteredUsers.join(', ')}`);

    // Format user mentions
    const userMentions = filteredUsers.map(id => `<@${id}>`).join(', ');

    return new Response(JSON.stringify({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `🎊 Party invite sent to: ${userMentions}\n\nSelected ${filteredUsers.length} user(s).`,
        flags: MessageFlags.Ephemeral,
      },
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    console.error('💥 Error submitting party invite modal:', err);
    return new Response(JSON.stringify({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: '❌ There was an error processing your party invite. Please try again.',
        flags: MessageFlags.Ephemeral,
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
