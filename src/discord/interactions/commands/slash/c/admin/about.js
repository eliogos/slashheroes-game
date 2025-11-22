export const command = {
    name: 'about',
    description: 'Lorep ipsum',
    type: 1
};

export async function execute(payload, env, ctx) {
    return {
        type: 4,
        data: {
            content: '_Coming soon_'
        }
    }
}
