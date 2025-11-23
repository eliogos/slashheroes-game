import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import pkg from '../package.json' assert { type: 'json' };

function safeExec(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}

const commit = safeExec('git rev-parse --short HEAD');
const commitTime = safeExec('git show -s --format=%cI HEAD');
const buildTime = new Date().toISOString();

const info = {
  version: pkg.version,
  buildTime,
  commit: commit || null,
  commitTime: commitTime || null,
};

writeFileSync('build-info.json', JSON.stringify(info, null, 2));
console.log('Wrote build-info.json:', info);
