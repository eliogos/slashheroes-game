import { rollDie } from '../../helpers/rollDie.ts';

const args = process.argv.slice(2);
const sides = args[0] ? Number(args[0]) : 20;
const times = args[1] ? Number(args[1]) : 1;

if (!Number.isInteger(sides) || sides < 2) {
	console.error(`Expected a die size of 2 or more, got "${args[0]}".`);
	process.exit(1);
}

for (let i = 0; i < times; i++) {
	const { roll, normalized } = rollDie(sides);
	console.log(`You rolled a d${sides}: ${roll} → ${normalized.toFixed(4)}`);
}
