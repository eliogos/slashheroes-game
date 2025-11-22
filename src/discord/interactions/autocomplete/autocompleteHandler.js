export async function handleAutocomplete(payload, env) {
  console.log('🔤 Autocomplete interaction received:', payload.data?.name);
  return new Response(JSON.stringify({ choices: [] }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
