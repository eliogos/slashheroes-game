import { activeAmmo } from '../index.ts';
import {
	getWeaponFamilyKeys,
	hasAnyWeaponFamily,
	normalizeWeaponFamilyIds,
} from '../../weapons/index.ts';

const SORT_FIELDS = ['index', 'name', 'weight', 'families', 'amplifiers'];
const SORT_DEFAULT_DIRECTIONS = {
	index: 'asc',
	name: 'asc',
	weight: 'desc',
	families: 'asc',
	amplifiers: 'desc'
};

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

function parseFamilyFilter(value) {
	if (!value) {
		return [];
	}

	return normalizeWeaponFamilyIds(
		value
			.split(',')
			.map(entry => entry.trim())
			.filter(Boolean),
		'family'
	);
}

function parseSortField(value) {
	if (!value) {
		return 'index';
	}

	const sortField = value.trim().toLowerCase();
	if (!SORT_FIELDS.includes(sortField)) {
		throw new Error(
			`Unknown sort field "${value}". Available fields: ${SORT_FIELDS.join(', ')}`
		);
	}

	return sortField;
}

function parseSortDirection(args, sortField) {
	if (args.asc && args.desc) {
		throw new Error('Use only one of --asc or --desc.');
	}

	if (args.asc) {
		return 'asc';
	}

	if (args.desc) {
		return 'desc';
	}

	return SORT_DEFAULT_DIRECTIONS[sortField];
}

function sortRows(rows, sortField, sortDirection) {
	const direction = sortDirection === 'desc' ? -1 : 1;

	return [...rows].sort((left, right) => {
		const leftValue = left[sortField];
		const rightValue = right[sortField];

		if (typeof leftValue === 'string' || typeof rightValue === 'string') {
			const result = String(leftValue).localeCompare(String(rightValue));
			if (result !== 0) {
				return result * direction;
			}
		} else if (leftValue !== rightValue) {
			return (leftValue - rightValue) * direction;
		}

		return left.index - right.index;
	});
}

const args = parseArgs(process.argv.slice(2));
const familyFilter = parseFamilyFilter(args.family);
const sortField = parseSortField(args.sort);
const sortDirection = parseSortDirection(args, sortField);

const ammo = activeAmmo.filter(entry => {
	return !familyFilter.length || hasAnyWeaponFamily(entry.compatibleFamilyFlag, familyFilter);
});

if (!ammo.length) {
	console.log('No ammo matched the provided filters.');
	process.exit(0);
}

const rows = ammo.map(entry => {
	const amplifierEntries = Object.entries(entry.weaponAmplifiers ?? {});
	return {
		index: entry.internalId,
		name: entry.display.en.name,
		families: getWeaponFamilyKeys(entry.compatibleFamilyFlag).join('+'),
		weight: entry.qualities?.weight ?? 0,
		amplifiers: amplifierEntries.length,
		weaponAmplifiers: amplifierEntries
			.map(([weaponId, multiplier]) => `${weaponId}:${multiplier}`)
			.join(', ')
	};
});

console.table(sortRows(rows, sortField, sortDirection));
