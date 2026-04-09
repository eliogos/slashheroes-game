import { bandolier } from './_entries/bandolier.js';
import { firstAidKit } from './_entries/first_aid_kit.js';
import { glassJar } from './_entries/glass_jar.js';
import { honeypot } from './_entries/honeypot.js';
import { ingredientPouch } from './_entries/ingredient_pouch.js';
import { keychain } from './_entries/keychain.js';
import { lunchbox } from './_entries/lunchbox.js';
import { pocketTreasureChest } from './_entries/pocket_treasure_chest.js';
import { potionBelt } from './_entries/potion_belt.js';
import { ringOfRings } from './_entries/ring_of_rings.js';
import { scrollCase } from './_entries/scroll_case.js';
import { waterskin } from './_entries/waterskin.js';
import { defineCarrier } from './helpers/index.js';
import type { ActiveCarrierDefinition, CarrierDefinition } from './helpers/index.js';

export { defineCarrier };
export * from './helpers/index.js';

export const carriers: CarrierDefinition[] = [
	potionBelt,
	ringOfRings,
	scrollCase,
	keychain,
	lunchbox,
	bandolier,
	waterskin,
	ingredientPouch,
	pocketTreasureChest,
	firstAidKit,
	honeypot,
	glassJar,
];

export const activeCarriers: ActiveCarrierDefinition[] = carriers.filter((entry) => !entry.archived) as ActiveCarrierDefinition[];

export function getCarrierById(id: string): ActiveCarrierDefinition | null {
	return activeCarriers.find((entry) => entry.id === id) ?? null;
}
