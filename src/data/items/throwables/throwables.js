import throwablesData from './throwables.json' with { type: 'json' };

export const throwables = throwablesData;
export const activeThrowables = throwables.filter(entry => !entry.archived);

export function getThrowableById(id) {
	return activeThrowables.find(entry => entry.id === id) ?? null;
}
