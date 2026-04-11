export interface DieRollResult {
	sides: number;
	roll: number;
	normalized: number;
}

export function rollDie(sides: number = 20): DieRollResult {
	const roll = Math.floor(Math.random() * sides) + 1;
	const normalized = sides === 1 ? 1 : (roll - 1) / (sides - 1);
	return { sides, roll, normalized };
}
