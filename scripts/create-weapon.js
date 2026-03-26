import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
	buildWeaponFamilyFlag,
	getWeaponFamilyKeys,
	normalizeWeaponFamilyIds
} from '../src/data/items/weapons/familyConfigs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const weaponsPath = path.resolve(__dirname, '../src/data/items/weapons/weapons.json');
const qualityKeys = new Set(['weight', 'speed', 'edge', 'reach', 'curvature']);

const helpText = `
Usage:
  npm run create:weapon -- --displayName "Assassin's Blade" --description "..." --tier 6 --families 128 --grip 1 --tags elite,ruthless,shadowed

Optional flags:
  --id assassinsBlade
  --internalId 7
  --localization '{"es":{"displayName":"Hoja del Asesino","description":"..."}}'
  --localizationFile .\\weapon.localization.json
  --qualityMultipliers weight=1.02,speed=1.03,edge=1.05,reach=1.06
  --archived
  --dry-run

Notes:
  families and tags use comma-separated values.
  families accepts numeric ids or family keys and is stored as familyFlag in weapons.json.
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

function readWeapons() {
  return JSON.parse(readFileSync(weaponsPath, 'utf8'));
}

function writeWeapons(weapons) {
  writeFileSync(weaponsPath, `${JSON.stringify(weapons, null, '\t')}\n`);
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

function parseCommaList(value, label) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map(entry => entry.trim())
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
    .map(entry => entry.trim())
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
  if (!/^[a-z][a-zA-Z0-9]*$/.test(id)) {
    throw new Error('id must use camelCase and start with a lowercase letter.');
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
		...familyKeys.map(family => family.toLowerCase()),
		...qualityKeys
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
  const families = normalizeWeaponFamilyIds(parseCommaList(args.families, 'families'));
  const tags = parseCommaList(args.tags, 'tags');
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
  if (![1, 2].includes(grip)) {
    throw new Error('grip must be 1 or 2.');
  }

  validateId(id);

  if (weapons.some(weapon => weapon.internalId === internalId)) {
    throw new Error(`internalId "${internalId}" already exists.`);
  }
  if (weapons.some(weapon => weapon.id === id)) {
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
    created_at: new Date().toISOString()
  };

  if (archived) {
    weapon.archived = true;
  }

  return weapon;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(helpText);
    return;
  }

  const weapons = readWeapons();
  const weapon = createWeaponRecord(args, weapons);
  const nextWeapons = [...weapons, weapon].sort((left, right) => left.internalId - right.internalId);

  if (args['dry-run'] || args.dryRun) {
    console.log('Dry run. Weapon was validated but not written:');
    console.log(JSON.stringify(weapon, null, 2));
    return;
  }

  writeWeapons(nextWeapons);
  console.log(`Created weapon "${weapon.displayName}" in ${weaponsPath}`);
  console.log(JSON.stringify(weapon, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
