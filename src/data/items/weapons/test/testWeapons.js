import {
	activeWeapons,
	familyConfigs,
	getBaseDamage,
	getDamageRange,
	getWeaponFamilyKeys,
	hasAnyWeaponFamily,
	normalizeQualities,
	normalizeWeaponFamilyIds,
	applyTierScaling,
	resolveFamilyDamageProfile,
	resolveFamilyQualities,
} from '../index.ts';

const families = familyConfigs;
const SORT_FIELDS = [
	'index',
	'name',
	'tier',
	'grip',
	'base',
	'range',
	'weight',
	'speed',
	'edge',
	'reach',
	'curvature'
];
const SORT_DEFAULT_DIRECTIONS = {
	index: 'asc',
	name: 'asc',
	tier: 'asc',
	grip: 'asc',
	base: 'desc',
	range: 'asc',
	weight: 'desc',
	speed: 'desc',
	edge: 'desc',
	reach: 'desc',
	curvature: 'desc'
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

function parseTierFilter(value) {
	if (!value) {
		return [];
	}

	const rawTiers = value
		.split(',')
		.map(entry => entry.trim())
		.filter(Boolean);

	const tiers = rawTiers.map(rawTier => {
		const tier = Number.parseInt(rawTier, 10);
		if (!Number.isInteger(tier) || `${tier}` !== rawTier) {
			throw new Error(`Unknown tier "${rawTier}". Tiers must be positive integers.`);
		}

		if (tier < 1) {
			throw new Error(`Unknown tier "${rawTier}". Tiers must be positive integers.`);
		}

		return tier;
	});

	return [...new Set(tiers)];
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

function round(value, digits = 2) {
	return Number(value.toFixed(digits));
}

function getSortValue(row, sortField) {
	if (sortField === 'name') {
		return row.name.toLowerCase();
	}

	if (sortField === 'range') {
		return row.rangeSpread;
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
			if (result !== 0) {
				return result * direction;
			}
		} else if (leftValue !== rightValue) {
			return (leftValue - rightValue) * direction;
		}

		return left.index - right.index;
	});
}

function getMaxQualities(weaponList) {
	let max = { weight: 0, speed: 0, edge: 0, reach: 0 };
	for (const weapon of weaponList) {
		const baseQualities = resolveFamilyQualities(weapon, families);
		const scaledQualities = applyTierScaling(baseQualities, weapon.tier);
		max.weight = Math.max(max.weight, scaledQualities.weight);
		max.speed = Math.max(max.speed, scaledQualities.speed);
		max.edge = Math.max(max.edge, scaledQualities.edge);
		max.reach = Math.max(max.reach, scaledQualities.reach);
	}
	return max;
}

const args = parseArgs(process.argv.slice(2));
const familyFilter = parseFamilyFilter(args.family);
const tierFilter = parseTierFilter(args.tier);
const sortField = parseSortField(args.sort);
const sortDirection = parseSortDirection(args, sortField);

const weapons = activeWeapons.filter(weapon => {
	const matchesFamily = !familyFilter.length || hasAnyWeaponFamily(weapon, familyFilter);
	const matchesTier = !tierFilter.length || tierFilter.includes(weapon.tier);
	return matchesFamily && matchesTier;
});

if (!weapons.length) {
	console.log('No weapons matched the provided filters.');
	process.exit(0);
}

const maxQualities = getMaxQualities(weapons);
const rows = [];

for (const weapon of weapons) {
	const baseQualities = resolveFamilyQualities(weapon, families);
	const scaledQualities = applyTierScaling(baseQualities, weapon.tier);
	const normalizedQualities = normalizeQualities(scaledQualities, maxQualities);
	const damageProfile = resolveFamilyDamageProfile(weapon, families);
	const baseDamage = getBaseDamage(normalizedQualities, damageProfile);
	const damageRange = getDamageRange(baseDamage, scaledQualities.curvature);

	rows.push({
		index: weapon.internalId,
		name: weapon.displayName ?? weapon.name,
		tier: weapon.tier,
		families: getWeaponFamilyKeys(weapon).join('+'),
		grip: weapon.grip,
		base: baseDamage,
		range: `${damageRange.min}-${damageRange.max}`,
		rangeSpread: damageRange.max - damageRange.min,
		weight: round(scaledQualities.weight, 0),
		speed: round(scaledQualities.speed),
		edge: round(scaledQualities.edge),
		reach: round(scaledQualities.reach),
		curvature: round(scaledQualities.curvature, 3)
	});
}

console.table(
	sortRows(rows, sortField, sortDirection).map(({ rangeSpread: _rangeSpread, ...row }) => row)
);
