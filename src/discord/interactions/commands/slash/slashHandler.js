export async function sendFollowUp(payload, body, defer = false) {
  const applicationId = payload.application_id;
  const token = payload.token;
  const url = `https://discord.com/api/webhooks/${applicationId}/${token}`;

  if (defer) {
    body.flags = (body.flags || 0) | 64;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(
      `❌ Failed to send follow-up: ${response.status} ${response.statusText}`,
      await response.text()
    );
  }
}

export async function editOriginal(payload, body) {
  const applicationId = payload.application_id;
  const token = payload.token;
  const url = `https://discord.com/api/webhooks/${applicationId}/${token}/messages/@original`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(
      `❌ Failed to edit original: ${response.status} ${response.statusText}`,
      await response.text()
    );
  }
}

export async function handleSlashCommand(payload, env, ctx) {
  const name = payload.data?.name?.toLowerCase();
  const command = slashCommands.get(name);

  try {
    let commandModule;

    try {
      commandModule = await import(`./c/${name}.js`);
    } catch {
      commandModule = await import(`./c/admin/${name}.js`);
    }

    if (typeof commandModule.execute !== "function") {
      console.warn(`⚠️ Command "${name}" is missing an execute() function.`);
      return new Response(
        JSON.stringify({
          type: 4,
          data: { content: "Invalid command module", flags: 64 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await commandModule.execute(payload, env, ctx);

    if (result instanceof Response) return result;

    return new Response(JSON.stringify(result ?? {}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(`❌ Failed to handle slash command "${name}":`, err);

    return new Response(
      JSON.stringify({
        type: 4,
        data: { content: "An unexpected error occurred.", flags: 64 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
