import carriersData from './carriers.json' with { type: 'json' };

export const carriers = carriersData;
export const activeCarriers = carriers.filter(entry => !entry.archived);

export function getCarrierById(id) {
	return activeCarriers.find(entry => entry.id === id) ?? null;
}
