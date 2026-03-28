import { activeBags } from '../bags.js';

const SORT_FIELDS = ['index', 'name', 'slots', 'weight'];
const SORT_DEFAULT_DIRECTIONS = {
	index:  'asc',
	name:   'asc',
	slots:  'asc',
	weight: 'asc',
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

function parseSortField(value) {
	if (!value) return 'index';

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

function sortRows(rows, sortField, sortDirection) {
	const direction = sortDirection === 'desc' ? -1 : 1;

	return [...rows].sort((left, right) => {
		const leftValue  = sortField === 'name' ? left[sortField].toLowerCase()  : left[sortField];
		const rightValue = sortField === 'name' ? right[sortField].toLowerCase() : right[sortField];

		if (typeof leftValue === 'string') {
			const result = leftValue.localeCompare(rightValue);
			if (result !== 0) return result * direction;
		} else if (leftValue !== rightValue) {
			return (leftValue - rightValue) * direction;
		}

		return left.index - right.index;
	});
}

const args = parseArgs(process.argv.slice(2));
const sortField     = parseSortField(args.sort);
const sortDirection = parseSortDirection(args, sortField);

const rows = activeBags.map(bag => ({
	index:  bag.internalId,
	name:   bag.displayName,
	slots:  bag.slots,
	weight: bag.weightCapacity,
}));

console.table(sortRows(rows, sortField, sortDirection));
