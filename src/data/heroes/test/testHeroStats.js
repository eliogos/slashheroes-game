import {
	computeHeroStats,
	getDerivedHeroStats,
	HERO_CLASSES,
	HERO_DERIVED_STATS,
	HERO_RACES,
	HERO_STATS,
} from '../index.ts';

function parseArgs(argv) {
	const args = {};
	for (let i = 0; i < argv.length; i += 1) {
		const token = argv[i];
		if (!token.startsWith('--')) throw new Error(`Unexpected argument "${token}".`);
		const key = token.slice(2);
		const next = argv[i + 1];
		if (!next || next.startsWith('--')) { args[key] = true; continue; }
		args[key] = next;
		i += 1;
	}
	return args;
}

function findByName(list, name) {
	const lower = name.toLowerCase();
	return list.find((item) => item.name.toLowerCase() === lower) ?? null;
}

function printSeparator(char = '─', width = 60) {
	console.log(char.repeat(width));
}

function printHeroSheet(race, heroClass) {
	const stats = computeHeroStats(race, heroClass);
	const derived = getDerivedHeroStats(stats);

	printSeparator('═');
	console.log(`  ${race.emoji}  ${race.name}  ✦  ${heroClass.emoji}  ${heroClass.name}`);
	console.log(`  ${race.summary} / ${heroClass.summary}`);
	printSeparator();

	// Base stats table
	const baseRows = HERO_STATS
		.filter((s) => s.shortcode !== 'HUN' && s.shortcode !== 'EXP')
		.map((s) => ({
			stat: `${s.shortcode}  ${s.name}`,
			value: stats[s.shortcode],
			type: s.type,
			influences: s.influences,
		}));

	console.log('\n  BASE STATS\n');
	console.table(baseRows);

	// Derived stats table
	const derivedRows = HERO_DERIVED_STATS.map((s) => {
		const rawValue = (() => {
			switch (s.shortcode) {
				case 'FOC':    return derived.focus;
				case 'ATKSPD': return derived.attackSpeed;
				case 'EVA':    return derived.evasion;
				case 'ACC':    return derived.accuracy;
				case 'CRIT':   return derived.critChance;
				case 'WILL':   return `bias ${derived.willpower.bonus >= 0 ? '+' : ''}${derived.willpower.bonus}`;
				case 'PDMG':   return `${derived.physicalDamage.min}–${derived.physicalDamage.max} (avg ${derived.physicalDamage.average})`;
				case 'WCAP':   return `${derived.weightCap.safe} kg safe / ${derived.weightCap.max} kg max`;
				case 'STAREG': return `${derived.staminaRegen.perSecond}/s (idle delay ${derived.staminaRegen.idleDelaySeconds}s)`;
				case 'MPREG':  return `${derived.manaRegen.perAction}/action`;
				case 'POISE':  return derived.poise;
				case 'MEND':   return `red ${derived.magicEffectEndurance.reductionChance} / null ${derived.magicEffectEndurance.nullifyChance}`;
				case 'RFLX':   return derived.reflex;
				default:       return '—';
			}
		})();

		return {
			stat: `${s.shortcode}  ${s.name}`,
			value: rawValue,
			derivedFrom: s.derivedFrom.join(', '),
		};
	});

	console.log('\n  DERIVED STATS\n');
	console.table(derivedRows);

	// Race inventory info
	console.log(`  Inventory slots: ${race.inventorySlots}`);
	printSeparator('═');
	console.log('');
}

function printRoster() {
	console.log('\n=== ALL RACE × CLASS COMBINATIONS ===\n');
	const rows = [];
	for (const race of HERO_RACES) {
		for (const heroClass of HERO_CLASSES) {
			const stats = computeHeroStats(race, heroClass);
			const derived = getDerivedHeroStats(stats);
			rows.push({
				race: race.name,
				class: heroClass.name,
				STR: stats.STR,
				AGI: stats.AGI,
				STA: stats.STA,
				HP:  stats.HP,
				MP:  stats.MP,
				WIS: stats.WIS,
				INT: stats.INT,
				PER: stats.PER,
				LUK: stats.LUK,
				EVA:    derived.evasion,
				ACC:    derived.accuracy,
				CRIT:   derived.critChance,
				PDMG:   `${derived.physicalDamage.min}–${derived.physicalDamage.max}`,
				POISE:  derived.poise,
			});
		}
	}
	console.table(rows);
}

// ── Entry point ──────────────────────────────────────────────────────────────

const args = parseArgs(process.argv.slice(2));

if (args.all) {
	printRoster();
	process.exit(0);
}

const raceName  = typeof args.race  === 'string' ? args.race  : null;
const className = typeof args.class === 'string' ? args.class : null;

// List available names if --list is passed or nothing is found
const listMode = args.list || (!raceName && !className);

if (listMode) {
	console.log('\nAvailable races:');
	for (const r of HERO_RACES)   console.log(`  ${r.emoji}  ${r.name}`);
	console.log('\nAvailable classes:');
	for (const c of HERO_CLASSES) console.log(`  ${c.emoji}  ${c.name}`);
	console.log('\nUsage:');
	console.log('  tsx src/data/heroes/test/testHeroStats.js --race Human --class Warrior');
	console.log('  tsx src/data/heroes/test/testHeroStats.js --all\n');
	process.exit(0);
}

const race = raceName
	? findByName(HERO_RACES, raceName)
	: HERO_RACES[Math.floor(Math.random() * HERO_RACES.length)];

const heroClass = className
	? findByName(HERO_CLASSES, className)
	: HERO_CLASSES[Math.floor(Math.random() * HERO_CLASSES.length)];

if (!race) {
	console.error(`Unknown race "${raceName}". Run with --list to see available options.`);
	process.exit(1);
}
if (!heroClass) {
	console.error(`Unknown class "${className}". Run with --list to see available options.`);
	process.exit(1);
}

printHeroSheet(race, heroClass);
