import {
	getExperienceForLevel,
	getExperienceProgress,
	getExperienceToNextLevel,
	getStatPointsForLevel,
	getTotalStatPointsForLevel,
} from '../index.ts';
import { STAT_DECIMAL_PLACES } from '../../helpers/constants.js';

function parseArgs(argv) {
	const args = {};

	for (let i = 0; i < argv.length; i += 1) {
		const token = argv[i];
		if (!token.startsWith('--')) {
			throw new Error(`Unexpected argument "${token}".`);
		}

		const key = token.slice(2);
		const next = argv[i + 1];
		if (!next || next.startsWith('--')) {
			args[key] = true;
			continue;
		}

		args[key] = next;
		i += 1;
	}

	return args;
}

function roundValue(value) {
	return Number(value.toFixed(STAT_DECIMAL_PLACES));
}

function parseLevelArg(value, fallback) {
	if (value == null) return fallback;

	const parsed = Number(value);
	if (!Number.isFinite(parsed) || parsed < 1) {
		throw new Error(`Expected a positive level number, received "${value}".`);
	}

	return Math.max(1, Math.floor(parsed));
}

function getMilestoneLabel(level) {
	const targetLevel = level + 1;
	if (targetLevel % 10 === 0) return 'milestone spike';
	if (targetLevel % 5 === 0) return 'breather';
	return '';
}

const args = parseArgs(process.argv.slice(2));
const start = parseLevelArg(args.start, 1);
const end = parseLevelArg(args.end, 20);

if (end < start) {
	throw new Error(`Expected --end to be greater than or equal to --start. Received ${end} < ${start}.`);
}

const rows = [];
let previousXpToNext = null;

for (let level = start; level <= end; level += 1) {
	const totalXpToReach = roundValue(getExperienceForLevel(level));
	const xpToNext = level < end ? roundValue(getExperienceToNextLevel(level)) : null;
	const midpointProgress = xpToNext == null
		? null
		: getExperienceProgress(totalXpToReach + (xpToNext / 2));

	rows.push({
		level,
		totalXpToReach,
		xpToNext: xpToNext ?? '—',
		stepDelta: previousXpToNext == null || xpToNext == null ? '—' : roundValue(xpToNext - previousXpToNext),
		statPoints: getStatPointsForLevel(level),
		totalStatPoints: getTotalStatPointsForLevel(level),
		halfwayLevel: midpointProgress ? roundValue(midpointProgress.exactLevel) : '—',
		note: getMilestoneLabel(level),
	});

	if (xpToNext != null) {
		previousXpToNext = xpToNext;
	}
}

console.log(`\n=== Experience Progression Table (${start} → ${end}) ===\n`);
console.table(rows);

if (args.xp != null) {
	const xp = Number(args.xp);
	if (!Number.isFinite(xp) || xp < 0) {
		throw new Error(`Expected --xp to be a non-negative number, received "${args.xp}".`);
	}

	const progress = getExperienceProgress(xp);
	console.log('\n=== Experience Snapshot ===\n');
	console.table([{
		xp: roundValue(xp),
		level: progress.level,
		currentLevelExperience: roundValue(progress.currentLevelExperience),
		nextLevelExperience: roundValue(progress.nextLevelExperience),
		experienceIntoLevel: roundValue(progress.experienceIntoLevel),
		experienceForNextLevel: roundValue(progress.experienceForNextLevel),
		progress: roundValue(progress.progress),
	}]);
}
