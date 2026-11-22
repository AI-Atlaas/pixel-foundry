// Prints the release notes for one version: its changelog section, followed by
// the install command. Used for the GitHub Release text.
//
//   node scripts/release-notes.mjs 0.1.3
import { readFileSync } from 'node:fs';

const CHANGELOG = 'docs/contributing/changelog.md';
const version = process.argv[2];

if (!version) {
  console.error('release-notes: give a version, such as 0.1.3.');
  process.exit(1);
}

const changelog = readFileSync(CHANGELOG, 'utf8');
const escaped = version.replace(/\./g, '\\.');
const section = new RegExp(`^## ${escaped} \\(.*\\)[ \\t]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm').exec(changelog);

if (!section || !section[1].trim()) {
  console.error(`release-notes: ${CHANGELOG} has no notes for ${version}.`);
  process.exit(1);
}

console.log(`${section[1].trim()}

Install:

\`\`\`bash
npm install @ai-atlaas/pixel-foundry @base-ui/react
\`\`\``);
