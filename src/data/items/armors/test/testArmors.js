import { activeArmors } from '../armors.js';
import { materialIds } from '../materialConfigs.js';
import { armorTypeIds, typeConfigs } from '../typeConfigs.js';
import { resolveArmorStat } from '../resolveArmorInfluence.js';

const SORT_FIELDS = ['index', 'name', 'type', 'material', 'stat', 'base', 'spread'];
const SORT_DEFAULT_DIRECTIONS = {
	index:    'asc',
	name:     'asc',
	type:     'asc',
	material: 'asc',
	stat:     'asc',
	base:     'desc',
	spread:   'desc',
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

function parseListFilter(value, validValues, label) {
	if (!value) {
		return [];
	}

	const entries = value.split(',').map(entry => entry.trim().toLowerCase()).filter(Boolean);

	for (const entry of entries) {
		if (!validValues.includes(entry)) {
			throw new Error(`Unknown ${label} "${entry}". Available: ${validValues.join(', ')}`);
		}
	}

	return [...new Set(entries)];
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

	if (args.asc) return 'asc';
	if (args.desc) return 'desc';

	return SORT_DEFAULT_DIRECTIONS[sortField];
}

function getSortValue(row, sortField) {
	if (sortField === 'name' || sortField === 'type' || sortField === 'material' || sortField === 'stat') {
		return row[sortField].toLowerCase();
	}

	return row[sortField];
}

function sortRows(rows, sortField, sortDirection) {
	const direction = sortDirection === 'desc' ? -1 : 1;

	return [...rows].sort((left, right) => {
		const leftValue = getSortValue(left, sortField);
		const rightValue = getSortValue(right, sortField);

		if (typeof leftValue === 'string' || typeof rightValue === 'string') {
			const result = String(leftValue).localeCompare(String(rightValue));
			if (result !== 0) return result * direction;
		} else if (leftValue !== rightValue) {
			return (leftValue - rightValue) * direction;
		}

		return left.index - right.index;
	});
}

const args = parseArgs(process.argv.slice(2));
const typeFilter     = parseListFilter(args.type,     armorTypeIds, 'type');
const materialFilter = parseListFilter(args.material, materialIds,  'material');
const sortField      = parseSortField(args.sort);
const sortDirection  = parseSortDirection(args, sortField);

const armors = activeArmors.filter(armor => {
	const matchesType     = !typeFilter.length     || typeFilter.includes(armor.type);
	const matchesMaterial = !materialFilter.length || materialFilter.includes(armor.material);
	return matchesType && matchesMaterial;
});

if (!armors.length) {
	console.log('No armor pieces matched the provided filters.');
	process.exit(0);
}

const rows = armors.map(armor => {
	const { stat, base, spread } = resolveArmorStat(armor);
	return {
		index:         armor.internalId,
		name:          armor.displayName,
		type:          armor.type,
		material:      armor.material,
		'base effect': `${stat}  ${base.toFixed(2)} ±${spread.toFixed(2)}`,
		base,
		spread,
	};
});

console.table(
	sortRows(rows, sortField, sortDirection).map(({ base: _base, spread: _spread, ...row }) => row)
);
