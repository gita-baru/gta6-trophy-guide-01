// Leonida Platinum — hand-in script for gta6-trophy-guide-01 (Node 22, stdlib only).
//
// The guide itself is the static site in app/ (index.html, style.css, app.js and
// data/trophies.json — no build step, no network loads). This script packages it:
// it copies app/ and screenshots/ next to this file into the output directory and
// writes dossier.json there, using the vendored make.fun frontend library.
// Leave vendor/makefun-frontend.ts untouched: the scorer requires dossier.json
// to be byte-for-byte what that copy writes.
//
// Run it locally with:
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// (Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.)
// Serve the guide while developing with `node serve.ts` (http://localhost:8080).

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's caps, from the kit's reference gate: text is capped at 160 KiB,
// at most 4 screenshots of at most 256 KiB each, and app/ holds at most 993
// files/directories and 48 MiB. Refusing here what the scorer would refuse
// keeps a bad package from ever being submitted.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 50331648,
  }),
);
console.log(`Leonida Platinum packaged into ${out}`);
