import armorsData from './armors.json' with { type: 'json' };

export const armors = armorsData;
export const activeArmors = armors.filter(entry => !entry.archived);

export function getArmorById(id) {
	return activeArmors.find(entry => entry.id === id) ?? null;
}

export function getArmorsByType(type) {
	return activeArmors.filter(entry => entry.type === type);
}

export function getArmorsByMaterial(material) {
	return activeArmors.filter(entry => entry.material === material);
}
