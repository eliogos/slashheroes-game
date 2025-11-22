export async function handleUserCommand(payload, env, ctx) {
  const name = payload.data?.name?.toLowerCase().replace(/\s+/g, '-');

  try {
    const commandModule = await import(`./c/${name}.js`);

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
