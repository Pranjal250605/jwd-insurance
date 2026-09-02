#!/usr/bin/env node
/**
 * Builds the site for a static host (onamae.com, MilesWeb, or the WordPress
 * server) and drops the .htaccess in beside it, so the output folder is the
 * complete upload with nothing left to remember.
 *
 * Usage:
 *   node scripts/build-static.mjs <target>
 *
 * Targets are defined below. Add one rather than passing flags by hand — the
 * point is that a deployment is reproducible from a name in a commit message.
 */
import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Optional build-time default for the consultation form's recipient.
 *
 * Normally left unset: the address lives in site-config.js inside the upload,
 * so whoever deploys can set it in cPanel without Node or a rebuild. Passing
 * CONTACT_EMAIL here only pre-fills that file.
 */
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? '';

const TARGETS = {
  // Japan — onamae.com. Static, no backend.
  onamae: {
    outDir: 'build-onamae',
    env: { VITE_BASE: '/', VITE_NO_BACKEND: '1', VITE_CONTACT_EMAIL: CONTACT_EMAIL },
    note: 'onamae.com (Japan) — domain root, no backend',
  },
  // India — MilesWeb. Static, no backend.
  milesweb: {
    outDir: 'build-milesweb',
    env: { VITE_BASE: '/', VITE_NO_BACKEND: '1', VITE_CONTACT_EMAIL: CONTACT_EMAIL },
    note: 'MilesWeb (India) — domain root, no backend',
  },
  // The WordPress server, in a subdirectory, calling Vercel for the forms.
  wp: {
    outDir: 'wp-build',
    env: { VITE_BASE: '/investment-llc/', VITE_API_BASE: 'https://jwd-insurance.vercel.app' },
    note: 'groupjwd.com/investment-llc/ — backend on Vercel',
  },
};

const target = process.argv[2];
const cfg = TARGETS[target];
if (!cfg) {
  console.error(`Unknown target "${target ?? ''}". Available: ${Object.keys(TARGETS).join(', ')}`);
  process.exit(1);
}


const dirSize = (p) =>
  readdirSync(p, { withFileTypes: true }).reduce((n, e) => {
    const full = join(p, e.name);
    return n + (e.isDirectory() ? dirSize(full) : statSync(full).size);
  }, 0);

console.log(`\nBuilding: ${cfg.note}\n`);
execSync(`npx tsc && npx vite build --outDir ${cfg.outDir} --emptyOutDir`, {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, ...cfg.env },
});

const htaccess = join(root, 'deploy', '.htaccess');
const dest = join(root, cfg.outDir);
if (!existsSync(htaccess)) {
  console.error('deploy/.htaccess is missing — the upload would have no server config.');
  process.exit(1);
}
copyFileSync(htaccess, join(dest, '.htaccess'));

// The upload carries its own instructions. --emptyOutDir wipes the folder on
// every build, so this is copied in rather than left to survive.
copyFileSync(join(root, 'deploy', 'README.md'), join(dest, 'README-DEPLOY.md'));

// Pre-fill site-config.js when an address was supplied.
if (CONTACT_EMAIL) {
  const cfgFile = join(dest, 'site-config.js');
  writeFileSync(cfgFile, readFileSync(cfgFile, 'utf8').replace('contactEmail: ""', `contactEmail: "${CONTACT_EMAIL}"`));
}

/* Zip it. -r recurses, and the dotfile is added explicitly: zip skips names
   beginning with a dot under some shells, and a .htaccess missing from the
   archive is the single most common reason a deploy like this looks broken. */
const zipName = `${cfg.outDir}.zip`;
execSync(`rm -f ../${zipName} && zip -qr ../${zipName} . -x '.DS_Store' && zip -q ../${zipName} .htaccess`, {
  cwd: dest, stdio: 'inherit', shell: '/bin/bash',
});

const zipPath = join(root, zipName);
console.log(`\n  ${cfg.outDir}/  ${(dirSize(dest) / 1024 / 1024).toFixed(1)} MB  (.htaccess included)`);
console.log(`  ${zipName}      ${(statSync(zipPath).size / 1024 / 1024).toFixed(1)} MB  ← upload this`);
if (cfg.env.VITE_NO_BACKEND === '1') {
  console.log('  No backend: consultation form opens the visitor\'s mail client,');
  console.log('  AI advisor omitted, consent is gated but not recorded.\n');
} else {
  console.log(`  Backend: ${cfg.env.VITE_API_BASE}\n`);
}
