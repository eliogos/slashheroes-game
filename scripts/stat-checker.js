import { createInterface } from 'readline/promises';
import { HERO_RACES } from '../src/data/heroes/heroRaces.js';
import { HERO_CLASSES } from '../src/data/heroes/heroClasses.js';
import { HERO_STATS } from '../src/data/heroes/heroStats.js';
import { computeHeroStats } from '../src/data/heroes/helpers.js';

const rl = createInterface({ input: process.stdin, output: process.stdout });

function printList(items) {
	items.forEach((item, i) => {
		console.log(`  ${String(i + 1).padStart(2)}. ${item.emoji} ${item.name.padEnd(12)} ${item.summary}`);
	});
}

async function pickFromList(label, items) {
	printList(items);
	while (true) {
		const input = await rl.question(`\nChoose a ${label} (1–${items.length}): `);
		const n = parseInt(input, 10);
		if (n >= 1 && n <= items.length) return items[n - 1];
		console.log(`  Invalid. Enter a number between 1 and ${items.length}.`);
	}
}

function printStats(race, heroClass, stats) {
	const SEP = '─'.repeat(52);
	console.log(`\n${SEP}`);
	console.log(`  ${race.emoji} ${race.name}  ×  ${heroClass.emoji} ${heroClass.name}`);
	console.log(SEP);

	for (const stat of HERO_STATS) {
		const key = stat.shortcode.toUpperCase();
		if (!(key in stats)) continue;

		const value = stats[key];
		const base = stat.defaultValue;
		const raceMod = (race.mods?.[stat.shortcode.toLowerCase()] ?? 0) * 10;
		const classMod = (heroClass.mods?.[stat.shortcode.toLowerCase()] ?? 0) * 10;
		const total = value - base;

		const totalStr = total === 0 ? '±0' : total > 0 ? `+${total}` : `${total}`;
		const raceStr = raceMod === 0 ? '±0' : raceMod > 0 ? `+${raceMod}` : `${raceMod}`;
		const classStr = classMod === 0 ? '±0' : classMod > 0 ? `+${classMod}` : `${classMod}`;
		const arrow = total > 0 ? '▲' : total < 0 ? '▼' : ' ';

		console.log(
			`  ${stat.shortcode.padEnd(4)} ${String(value).padStart(4)}  ${arrow} ${totalStr.padStart(4)}` +
			`   (Race ${raceStr.padStart(4)}, Class ${classStr.padStart(4)})  ${stat.influences}`
		);
	}

	console.log(SEP);
	console.log(`  Starter weapons: ${heroClass.preferredStarterWeapons.join(', ')}`);
	console.log(`${SEP}\n`);
}

console.log('\n=== Stat Checker ===\n');

console.log('Races:\n');
const race = await pickFromList('race', HERO_RACES);

console.log('\nClasses:\n');
const heroClass = await pickFromList('class', HERO_CLASSES);

const stats = computeHeroStats(race, heroClass);
printStats(race, heroClass, stats);

rl.close();
