// Prepares a release: bumps the version in package.json and package-lock.json,
// and turns the changelog's "## Unreleased" heading into "## <version> (<date>)".
//
//   node scripts/prepare-release.mjs patch    # or minor / major / an exact x.y.z
//
// Run by the "Prepare release" workflow; also works locally. Prints the new
// version, and writes it to $GITHUB_OUTPUT as `version` when run in Actions.
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';

const CHANGELOG = 'docs/contributing/changelog.md';
const bump = process.argv[2];

function fail(message) {
  console.error(`prepare-release: ${message}`);
  process.exit(1);
}

if (!bump || !/^(patch|minor|major|\d+\.\d+\.\d+)$/.test(bump)) {
  fail('give a bump: patch, minor, major, or an exact version such as 1.2.3.');
}

// Check the changelog before touching the version, so a failed run changes nothing.
const changelog = readFileSync(CHANGELOG, 'utf8');
const unreleased = /^## Unreleased[ \t]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(changelog);
if (!unreleased) {
  fail(`${CHANGELOG} has no "## Unreleased" section. Add one listing the changes in this release.`);
}
if (!unreleased[1].trim()) {
  fail(`the "## Unreleased" section in ${CHANGELOG} is empty. List the changes in this release first.`);
}

execFileSync('npm', ['version', bump, '--no-git-tag-version'], { stdio: 'ignore' });
const { version } = JSON.parse(readFileSync('package.json', 'utf8'));

const date = new Date().toISOString().slice(0, 10);
writeFileSync(CHANGELOG, changelog.replace(/^## Unreleased[ \t]*$/m, `## ${version} (${date})`));

if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);
console.log(version);
