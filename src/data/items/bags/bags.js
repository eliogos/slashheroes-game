import bagsData from './bags.json' with { type: 'json' };

export const bags = bagsData;
export const activeBags = bags.filter(entry => !entry.archived);

export function getBagById(id) {
	return activeBags.find(entry => entry.id === id) ?? null;
}
