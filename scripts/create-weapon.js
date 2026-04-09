import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
	buildWeaponFamilyFlag,
	getWeaponFamilyKeys,
	getPrimaryFamilyKey,
	normalizeWeaponFamilyIds,
} from '../src/data/items/weapons/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const weaponsRoot = path.resolve(__dirname, '../src/data/items/weapons');
const weaponEntriesDir = path.join(weaponsRoot, '_entries');
const weaponRegistryFile = path.join(weaponsRoot, 'helpers', 'weaponEntries.ts');
const qualityKeys = new Set(['weight', 'speed', 'edge', 'reach', 'curvature']);

const helpText = `
Usage:
  npm run create:weapon -- --displayName "Storm Pike" --description "..." --tier 6 --families POLEARM,BATTERY --grip 2 --tags elite,tempest,royal

Optional flags:
  --id stormPike
  --internalId 141
  --localization '{"es":{"displayName":"Pica Tormenta","description":"..."}}'
  --localizationFile .\\weapon.localization.json
  --qualityMultipliers weight=1.02,speed=1.03,edge=1.05,reach=1.06
  --archived
  --dry-run

Notes:
  families and tags use comma-separated values.
  families accepts numeric ids or family keys and is stored as a combined familyFlag.
  the weapon will be written as a defineWeapon() TS entry in src/data/items/weapons/_entries/<family>/.
  localization accepts a JSON object or --localizationFile.
  qualityMultipliers accepts JSON or key=value pairs.
`.trim();

function parseArgs(argv) {
	const args = {};

	for (let i = 0; i < argv.length; i += 1) {
		const token = argv[i];
		if (!token.startsWith('--')) {
			throw new Error(`Unexpected argument "${token}". Use --help for usage.`);
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

async function readAllWeapons() {
	const { weapons } = await import('../src/data/items/weapons/index.ts');
	return weapons;
}

function toTsLiteral(value, indentLevel = 0) {
	const indent = '\t'.repeat(indentLevel);
	const childIndent = '\t'.repeat(indentLevel + 1);

	if (value === null) {
		return 'null';
	}

	if (typeof value === 'string') {
		return `'${value
			.replace(/\\/g, '\\\\')
			.replace(/'/g, "\\'")
			.replace(/\r/g, '\\r')
			.replace(/\n/g, '\\n')}'`;
	}

	if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	}

	if (Array.isArray(value)) {
		if (!value.length) {
			return '[]';
		}

		const items = value.map((entry) => `${childIndent}${toTsLiteral(entry, indentLevel + 1)}`);
		return `[
${items.join(',\n')},
${indent}]`;
	}

	if (typeof value === 'object') {
		const entries = Object.entries(value).filter(([, entry]) => entry !== undefined);
		if (!entries.length) {
			return '{}';
		}

		const props = entries.map(([key, entry]) => `${childIndent}${key}: ${toTsLiteral(entry, indentLevel + 1)}`);
		return `{
${props.join(',\n')},
${indent}}`;
	}

	return 'undefined';
}

function formatWeaponCode(weapon) {
	const familyKeys = getWeaponFamilyKeys(weapon.familyFlag);
	const lines = [];

	lines.push(`import { defineWeapon, ${familyKeys.join(', ')} } from '../../helpers/index.js';`);
	lines.push('');
	lines.push(`export const ${weapon.id} = defineWeapon({`);
	lines.push(`\tinternalId: ${weapon.internalId},`);
	lines.push(`\tid: ${toTsLiteral(weapon.id)},`);
	lines.push(`\tdisplayName: ${toTsLiteral(weapon.displayName)},`);
	lines.push(`\tdescription: ${toTsLiteral(weapon.description)},`);
	lines.push(`\ttags: ${toTsLiteral(weapon.tags ?? [], 1)},`);
	lines.push(`\ttier: ${weapon.tier},`);
	lines.push(`\tgrip: ${weapon.grip},`);
	lines.push(`\tfamilies: ${familyKeys.join(' | ')},`);

	if (weapon.localization && Object.keys(weapon.localization).length) {
		lines.push(`\tlocalization: ${toTsLiteral(weapon.localization, 1)},`);
	}

	if (weapon.qualityMultipliers && Object.keys(weapon.qualityMultipliers).length) {
		lines.push(`\tqualityMultipliers: ${toTsLiteral(weapon.qualityMultipliers, 1)},`);
	}

	if (weapon.effect) {
		lines.push(`\teffect: ${toTsLiteral(weapon.effect, 1)},`);
	}

	if (weapon.archived) {
		lines.push(`\tarchived: true,`);
	}

	lines.push(`\tcreated_at: ${toTsLiteral(weapon.created_at)},`);
	lines.push('});');
	lines.push('');

	return lines.join('\n');
}

function writeWeaponFile(weapon) {
	const primaryKey = getPrimaryFamilyKey(weapon.familyFlag).toLowerCase();
	const familyDir = path.join(weaponEntriesDir, primaryKey);
	const filePath = path.join(familyDir, `${weapon.id}.ts`);

	mkdirSync(familyDir, { recursive: true });
	if (existsSync(filePath)) {
		throw new Error(`Weapon file already exists: ${filePath}`);
	}

	writeFileSync(filePath, formatWeaponCode(weapon), 'utf8');
	return filePath;
}

async function rebuildWeaponRegistry() {
	const familyDirs = readdirSync(weaponEntriesDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

	const registryImports = [];
	const groupBlocks = [];
	const groupedNames = [];

	for (const familyName of familyDirs) {
		const familyDir = path.join(weaponEntriesDir, familyName);
		const files = readdirSync(familyDir)
			.filter((name) => name.endsWith('.ts'))
			.sort();

		const entries = [];
		for (const fileName of files) {
			const fileBase = path.basename(fileName, '.ts');
			const filePath = path.join(familyDir, fileName);
			const moduleUrl = `${pathToFileURL(filePath).href}?t=${Date.now()}-${Math.random()}`;
			const mod = await import(moduleUrl);
			const weapon = mod[fileBase] ?? Object.values(mod).find(
				(value) => value && typeof value === 'object' && 'internalId' in value,
			);

			if (!weapon) {
				throw new Error(`Could not determine weapon export for ${filePath}`);
			}

			entries.push({ fileBase, internalId: weapon.internalId });
		}

		entries.sort((left, right) => left.internalId - right.internalId || left.fileBase.localeCompare(right.fileBase));

		const groupName = `${familyName}Weapons`;
		groupedNames.push(groupName);

		for (const entry of entries) {
			registryImports.push(`import { ${entry.fileBase} } from '../_entries/${familyName}/${entry.fileBase}.js';`);
		}

		groupBlocks.push(`export const ${groupName} = [\n\t${entries.map((entry) => entry.fileBase).join(',\n\t')},\n] as const;`);
	}

	const registryContent = [
		`import type { WeaponDefinition } from './types.js';`,
		'',
		...registryImports,
		'',
		...groupBlocks.flatMap((block) => [block, '']),
		`export const weapons: WeaponDefinition[] = [`,
		...groupedNames.map((groupName) => `\t...${groupName},`),
		`];`,
		'',
	].join('\n');

	writeFileSync(weaponRegistryFile, registryContent, 'utf8');
}

function parseInteger(value, label) {
	const parsed = Number.parseInt(value, 10);
	if (!Number.isInteger(parsed)) {
		throw new Error(`${label} must be an integer.`);
	}
	return parsed;
}

function parseBoolean(value, label) {
	if (value === true) {
		return true;
	}
	if (value === undefined) {
		return false;
	}

	const normalized = String(value).toLowerCase();
	if (normalized === 'true') {
		return true;
	}
	if (normalized === 'false') {
		return false;
	}

	throw new Error(`${label} must be true or false.`);
}

function parseCommaList(value) {
	if (!value) {
		return [];
	}

	return value
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean);
}

function parseJsonObject(value, label) {
	if (!value) {
		return {};
	}

	try {
		const parsed = JSON.parse(value);
		if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
			throw new Error('Expected an object.');
		}
		return parsed;
	} catch (error) {
		throw new Error(`${label} must be a valid JSON object. ${error.message}`);
	}
}

function parseKeyValueNumberObject(value, label) {
	if (!value) {
		return {};
	}

	return value
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean)
		.reduce((result, entry) => {
			const [rawKey, rawValue] = entry.split('=');
			const key = rawKey?.trim();
			const parsedValue = Number.parseFloat(rawValue);

			if (!key || rawValue === undefined) {
				throw new Error(`${label} entries must use key=value format.`);
			}
			if (Number.isNaN(parsedValue)) {
				throw new Error(`${label}.${key} must be a number.`);
			}

			result[key] = parsedValue;
			return result;
		}, {});
}

function parseLocalization(args) {
	if (args.localization && args.localizationFile) {
		throw new Error('Use either localization or localizationFile, not both.');
	}

	if (args.localizationFile) {
		const filePath = path.resolve(process.cwd(), args.localizationFile);
		const fileContents = readFileSync(filePath, 'utf8');
		return parseJsonObject(fileContents, 'localizationFile');
	}

	return parseJsonObject(args.localization, 'localization');
}

function parseQualityMultipliers(value) {
	if (!value) {
		return {};
	}

	return value.includes('=')
		? parseKeyValueNumberObject(value, 'qualityMultipliers')
		: parseJsonObject(value, 'qualityMultipliers');
}

function toSafeId(displayName) {
	const words = displayName
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9]+/g, ' ')
		.trim()
		.split(/\s+/)
		.filter(Boolean);

	if (!words.length) {
		throw new Error('displayName must contain letters or numbers.');
	}

	return words
		.map((word, index) => {
			const normalized = word.toLowerCase();
			if (index === 0) {
				return normalized;
			}
			return normalized.charAt(0).toUpperCase() + normalized.slice(1);
		})
		.join('');
}

function validateId(id) {
	if (!/^[a-z][a-zA-Z0-9_]*$/.test(id)) {
		throw new Error('id must start with a lowercase letter and use only letters, numbers, or underscores.');
	}
}

function validateTags(tags, displayName, families) {
	if (!tags.length) {
		throw new Error('tags must contain at least one entry.');
	}

	const familyKeys = getWeaponFamilyKeys(families);
	const forbidden = new Set([
		...displayName
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.split(/[^a-z0-9]+/)
			.filter(Boolean),
		...familyKeys.map((family) => family.toLowerCase()),
		...qualityKeys,
	]);

	for (const tag of tags) {
		if (/\s/.test(tag)) {
			throw new Error(`Tag "${tag}" must be a single word.`);
		}
		if (forbidden.has(tag.toLowerCase())) {
			throw new Error(`Tag "${tag}" reuses the weapon name, family, or a quality term.`);
		}
	}
}

function validateLocalization(localization) {
	for (const [languageCode, entry] of Object.entries(localization)) {
		if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
			throw new Error(`localization.${languageCode} must be an object.`);
		}
		if (typeof entry.displayName !== 'string' || !entry.displayName.trim()) {
			throw new Error(`localization.${languageCode}.displayName is required.`);
		}
		if (typeof entry.description !== 'string' || !entry.description.trim()) {
			throw new Error(`localization.${languageCode}.description is required.`);
		}
	}
}

function validateFamilies(families) {
	normalizeWeaponFamilyIds(families);
}

function validateQualityMultipliers(qualityMultipliers) {
	for (const [key, value] of Object.entries(qualityMultipliers)) {
		if (!qualityKeys.has(key)) {
			throw new Error(`qualityMultipliers.${key} is not a supported quality key.`);
		}
		if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
			throw new Error(`qualityMultipliers.${key} must be a positive number.`);
		}
	}
}

function getNextInternalId(weapons) {
	const maxId = weapons.reduce((currentMax, weapon) => Math.max(currentMax, weapon.internalId), 0);
	return maxId + 1;
}

function createWeaponRecord(args, weapons) {
	const displayName = String(args.displayName ?? '').trim();
	const description = String(args.description ?? '').trim();
	const families = normalizeWeaponFamilyIds(parseCommaList(args.families));
	const tags = parseCommaList(args.tags);
	const localization = parseLocalization(args);
	const qualityMultipliers = parseQualityMultipliers(args.qualityMultipliers);

	if (!displayName) {
		throw new Error('displayName is required.');
	}
	if (!description) {
		throw new Error('description is required.');
	}
	if (!families.length) {
		throw new Error('families must contain at least one family id.');
	}

	validateFamilies(families);
	validateTags(tags, displayName, families);
	validateLocalization(localization);
	validateQualityMultipliers(qualityMultipliers);

	const tier = parseInteger(args.tier, 'tier');
	const grip = parseInteger(args.grip, 'grip');
	const internalId = args.internalId !== undefined ? parseInteger(args.internalId, 'internalId') : getNextInternalId(weapons);
	const id = String(args.id ?? toSafeId(displayName)).trim();
	const archived = parseBoolean(args.archived, 'archived');

	if (tier < 1) {
		throw new Error('tier must be 1 or higher.');
	}
	if (![0, 1, 2].includes(grip)) {
		throw new Error('grip must be 0, 1, or 2.');
	}

	validateId(id);

	if (weapons.some((weapon) => weapon.internalId === internalId)) {
		throw new Error(`internalId "${internalId}" already exists.`);
	}
	if (weapons.some((weapon) => weapon.id === id)) {
		throw new Error(`id "${id}" already exists.`);
	}

	const weapon = {
		internalId,
		id,
		displayName,
		description,
		tags,
		localization,
		tier,
		familyFlag: buildWeaponFamilyFlag(families),
		grip,
		qualityMultipliers,
		created_at: new Date().toISOString(),
	};

	if (archived) {
		weapon.archived = true;
	}

	return weapon;
}

async function main() {
	const args = parseArgs(process.argv.slice(2));

	if (args.help) {
		console.log(helpText);
		return;
	}

	const weapons = await readAllWeapons();
	const weapon = createWeaponRecord(args, weapons);
	const filePreview = formatWeaponCode(weapon);

	if (args['dry-run'] || args.dryRun) {
		console.log('Dry run. Weapon was validated but not written:');
		console.log(filePreview);
		return;
	}

	const filePath = writeWeaponFile(weapon);
	await rebuildWeaponRegistry();
	console.log(`Created weapon "${weapon.displayName}" in ${filePath}`);
	console.log(filePreview);
}

try {
	await main();
} catch (error) {
	console.error(error.message);
	process.exitCode = 1;
}
