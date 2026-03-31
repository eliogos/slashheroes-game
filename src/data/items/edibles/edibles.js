import ediblesData from './edibles.json' with { type: 'json' };

export const edibles = ediblesData;
export const activeEdibles = edibles.filter(entry => !entry.archived);

export function getEdibleById(id) {
	return activeEdibles.find(entry => entry.id === id) ?? null;
}
