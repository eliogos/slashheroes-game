export async function handleUserCommand(payload, env, ctx) {
  const name = payload.data?.name?.toLowerCase().replace(/\s+/g, '-');

  try {
    // Import the user commands index so the bundler includes available modules.
    const commandsIndex = await import('./list/index.js');

    // Try direct lookup from the index exports
    let commandModule = commandsIndex[name];

    // Fallback: dash-case -> camelCase (e.g. view-hero -> viewHero)
    if (!commandModule && name.includes('-')) {
      const camel = name.split('-').map((p, i) => i === 0 ? p : p[0].toUpperCase() + p.slice(1)).join('');
      commandModule = commandsIndex[camel];
    }

    // Final fallback: attempt dynamic import (may fail during build if unknown)
    if (!commandModule) {
      try {
        commandModule = await import(`./list/${name}.js`);
      } catch (e) {
        // leave undefined; handled below
      }
    }

    if (!commandModule || typeof commandModule.execute !== 'function') {
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
    console.error(`❌ Failed to handle user command "${name}":`, err);

    return new Response(
      JSON.stringify({
        type: 4,
        data: { content: "An unexpected error occurred.", flags: 64 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
