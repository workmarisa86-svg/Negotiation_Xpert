/* Stamps sw.js with a content hash of every precached file and bumps VERSION when anything changed.
   Usage:  node tools/stamp-sw.js          (bumps the patch number: 1.1.0 -> 1.1.1)
           node tools/stamp-sw.js minor    (1.1.0 -> 1.2.0)
           node tools/stamp-sw.js --check  (exit 1 if sw.js is out of date; used by the tests) */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const swPath = path.join(root, 'sw.js');

function readSw() { return fs.readFileSync(swPath, 'utf8'); }
function assetsOf(sw) {
  const block = sw.slice(sw.indexOf('// ASSETS:START'), sw.indexOf('// ASSETS:END'));
  return (block.match(/'([^']+)'/g) || []).map(s => s.slice(1, -1));
}
function computeBuild(sw) {
  const h = crypto.createHash('sha256');
  assetsOf(sw).filter(a => a !== './').forEach(a => {
    h.update(a + '\n');
    h.update(fs.readFileSync(path.join(root, a)));
  });
  // sw.js logic itself counts too (excluding the VERSION/BUILD lines being stamped)
  h.update(sw.replace(/^const (VERSION|BUILD) = .*$/gm, ''));
  return h.digest('hex').slice(0, 8);
}
function current(sw) {
  return { version: sw.match(/const VERSION = '([^']+)'/)[1], build: sw.match(/const BUILD = '([^']+)'/)[1] };
}

module.exports = { assetsOf, computeBuild, current, swPath };

if (require.main === module) {
  const sw = readSw();
  const build = computeBuild(sw);
  const cur = current(sw);
  if (process.argv.includes('--check')) {
    if (build !== cur.build) { console.error(`sw.js is stale (BUILD ${cur.build}, files hash ${build}). Run: node tools/stamp-sw.js`); process.exit(1); }
    console.log(`sw.js up to date: ${cur.version} (${build})`);
    process.exit(0);
  }
  if (build === cur.build) { console.log(`No changes. Version stays ${cur.version} (${build}).`); process.exit(0); }
  const parts = cur.version.split('.').map(Number);
  if (process.argv.includes('major')) { parts[0]++; parts[1] = 0; parts[2] = 0; }
  else if (process.argv.includes('minor')) { parts[1]++; parts[2] = 0; }
  else parts[2]++;
  const version = parts.join('.');
  const out = sw.replace(/const VERSION = '[^']+'/, `const VERSION = '${version}'`).replace(/const BUILD = '[^']+'/, `const BUILD = '${build}'`);
  fs.writeFileSync(swPath, out);
  console.log(`sw.js stamped: ${cur.version} -> ${version} (${build})`);
}
