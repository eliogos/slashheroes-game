import helmsData    from './helms.json'    with { type: 'json' };
import chestsData   from './chests.json'   with { type: 'json' };
import leggingsData from './leggings.json' with { type: 'json' };
import bootsData    from './boots.json'    with { type: 'json' };

export const helms    = helmsData;
export const chests   = chestsData;
export const leggings = leggingsData;
export const boots    = bootsData;

export const armors       = [...helms, ...chests, ...leggings, ...boots];
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
