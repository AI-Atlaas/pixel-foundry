---
description: Work on Pixel Foundry locally, test it and publish a release.
---

# Development

## Setup

```bash
git clone https://github.com/AI-Atlaas/pixel-foundry.git
cd pixel-foundry
npm install
```

Requires Node.js 20 or newer.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run typecheck` | TypeScript check of `src/` |
| `npm run build` | Clears `dist/`, bundles `src/` with tsup (ESM + type definitions), copies `styles/` and fonts, and generates `dist/themes/*.css` |
| `npm test` | Runs `test/*.test.mjs` against the build: WCAG contrast for every palette, token mapping, theme CSS output |
| `npm pack` | Builds `ai-atlaas-pixel-foundry-<version>.tgz`, exactly what npm would publish |

`npm test` reads from `dist/`, so run `npm run build` first.

## Project layout

```
├── src/
│   ├── index.ts          public exports
│   ├── core.tsx          button, switch, checkbox, slider, select, modal
│   ├── extras.tsx        the other 25 components
│   ├── icon.tsx          Icon + icon names
│   ├── click-effects.tsx
│   └── theme.ts          palettes, tokens(), applyTheme(), presetCSS() (no React)
├── styles/
│   ├── components.css    all component styles (becomes dist/styles.css)
│   └── fonts/            font files + OFL licenses
├── scripts/
│   ├── build-styles.mjs      writes dist/styles.css, fonts and themes
│   ├── prepare-release.mjs   bumps the version and dates the changelog
│   └── release-notes.mjs     prints a version's changelog notes
├── .github/workflows/    Prepare release, Publish to npm, Deploy demos
├── test/theme.test.mjs
├── docs/                 this GitBook documentation
├── gitbook-integration/  the live demos and the GitBook block that embeds them
└── tsup.config.ts
```

## Adding a component

1. Write the wrapper in `src/extras.tsx`. Compose Base UI parts and apply `px-*` classes, and require a `label` or `children` for the accessible name.
2. Add any new styles to `styles/components.css`. Use tokens (`var(--primary)`, `var(--pixel)`, …), never hard-coded colors.
3. Run `npm run typecheck && npm run build`.
4. Add a page for it in `docs/components/`, for example `docs/components/date-field.md`. Follow the existing pages: a live demo, then **Import**, **Usage** and **Props** sections.
5. Add a demo for it, as described in [Live demos](#live-demos), once the component is in a published release.
6. Link the page in `docs/SUMMARY.md` (components are listed alphabetically) and in the catalog in `docs/components/README.md`.

## Adding or changing a palette

1. Edit `presets` in `src/theme.ts`. Each mode has 8 colors in this order: background, card, foreground, muted-foreground, secondary, primary, primary-foreground, accent.
2. Run `npm run build && npm test`. The contrast test fails if any text pair drops below 4.5:1.
3. Update `docs/design-system/palettes.md`.

## Trying a build in another project

```bash
npm pack
cd ../my-app
npm install ../pixel-foundry/ai-atlaas-pixel-foundry-0.1.0.tgz
```

## Publishing

Releases are automated with two workflows. `main` only accepts changes through pull requests, so each release is a pull request too.

**While you work:** list each change under a `## Unreleased` heading at the top of the [Changelog](changelog.md), in the same pull request as the change. Add the heading if it isn't there. Those lines become the release notes.

**To release:**

1. In the repository's **Actions** tab, run **Prepare release** and pick `patch`, `minor` or `major`. It bumps the version in `package.json` and `package-lock.json`, renames `## Unreleased` to `## <version> (<date>)`, pushes a `release-<version>` branch and opens a `Release <version>` pull request. It stops without changing anything if the `## Unreleased` section is missing or empty.
2. Review and merge the pull request.
3. Merging starts **Publish to npm**. It sees that the version has no `v<version>` tag yet, waits for approval in the `production` environment, and publishes. Approve it from the run page (**Review deployments**).
4. After the publish succeeds, the same run tags the commit `v<version>`, creates the GitHub Release with the changelog section as its notes, and redeploys the docs demos with the new version (see [Live demos](#live-demos)).

Opening the pull request in step 1 needs **Allow GitHub Actions to create and approve pull requests** in **Settings → Actions → General**. Without it, the workflow still pushes the branch, and its run summary links to a page where you open the pull request with one click.

Both scripts the workflows use also run locally. `node scripts/prepare-release.mjs patch` makes the same changes to your working copy, and `node scripts/release-notes.mjs <version>` prints a version's notes.

Publishing a GitHub Release by hand still works too: it publishes the release's tag, after checking that the tag matches the version in `package.json`. It doesn't redeploy the demos, so run **Deploy demos** from the Actions tab afterwards.

`prepublishOnly` type-checks, builds and tests the package before uploading, so a failing check stops the release. A version number can never be reused on npm, and a version can only be unpublished within 72 hours.

The workflow uses npm **trusted publishing**: npm verifies the workflow through GitHub's OIDC token, so no npm token is stored in the repository. The trusted publisher is configured in the package's settings on npmjs.com, for the `AI-Atlaas/pixel-foundry` repository, the `publish.yml` workflow and the `production` environment. The publish job runs in the GitHub environment `production` to match. If the workflow file or the environment is renamed, update that setting too.

The `production` environment has a required reviewer, set in **Settings → Environments**, so every publish waits for approval. Remove the reviewer there to publish without approval.

The package is published under the **AI Atlaas** npm organization as `@ai-atlaas/pixel-foundry`. `publishConfig.access` is set to `public` in `package.json`, because scoped packages are private by default.

## Docs

The `docs/` folder is synced to GitBook with site-wide **Git Sync**, using `docs/` as the Project directory. `docs/gitbook-docs.yaml` describes the site's sections and maps the Pixel Foundry space to the `docs/` folder. `docs/README.md` is the home page and `docs/SUMMARY.md` defines the navigation.

Edits made in GitBook come back as commits on `main`, so pull before editing the docs locally.

## Live demos

Each component page starts with a live demo. Two parts in `gitbook-integration/` make this work:

* **The demos** are a small static site on GitHub Pages, at [ai-atlaas.github.io/pixel-foundry](https://ai-atlaas.github.io/pixel-foundry/). Each demo is a page with the compiled demo, React, Base UI, the package's CSS and its fonts. Nothing is installed or built when a docs page opens.
* **The GitBook integration** `pixel-foundry` adds a **Pixel Foundry demo** block that embeds one of those pages. It's published privately to the GitBook organization that owns these docs. The block reads the demo list from Pages, so it only needs publishing again when the block itself changes.

In Markdown, a block is one line, where `demo` is the demo's id:

```
{% @pixel-foundry/demo demo="select" %}
```

In the GitBook editor, insert it from the ( ⌘ + / ) menu and pick the demo from the block's menu.

The **Deploy demos** workflow (`.github/workflows/demos.yml`) builds and deploys the demos. It runs after every release, when the demos change on `main`, and by hand from the Actions tab. It always builds with the package version in the root `package.json`, as published on npm, so the demos show what people can install. GitBook re-reads the demo list about once an hour, so a change can take that long to appear in the docs.

| Path in `gitbook-integration/` | What it is |
| --- | --- |
| `frame/demos/<id>.tsx` | One demo per file. Each default-exports a small React component. |
| `frame/demos/demos.json` | The demo list: `id`, menu `title`, minimum frame `height` in pixels (room for its popup), and `top: true` to pin popup demos near the top. |
| `frame/main.tsx`, `frame/frame.css` | The page inside the frame: the light/dark toggle, auto-height, and layout helpers such as `demo-row`, `demo-stack` and `demo-wide`. |
| `scripts/build-pages.mjs` | Builds the demos into `out/` (ignored by Git): `frame.html`, `assets/`, `demos.json`, and an `index.html` with every demo. |
| `src/index.tsx` | The GitBook block. It reads `demos.json` from Pages and embeds `frame.html?demo=<id>`. |

To add or change a demo:

1. Write `frame/demos/<id>.tsx` and add it to `frame/demos/demos.json`.
2. Check it locally. This builds the site and serves it the way Pages does, with every demo on one page sized the way GitBook sizes it:

   ```bash
   cd gitbook-integration
   npm install
   npm run preview      # http://localhost:5182/
   npm run typecheck
   ```

3. Merge it to `main`. **Deploy demos** publishes it to Pages.
4. Add `{% @pixel-foundry/demo demo="<id>" %}` to the page.

To change the block itself (`src/index.tsx` or `gitbook-manifest.yaml`), publish the integration again. This needs a GitBook personal access token from an organization member, set once with `npx gitbook auth`, and the organization's ID, the `<id>` in `app.gitbook.com/o/<id>/` (or run `npx gitbook organizations list`). The ID is kept out of the repo, so pass it when publishing:

```bash
GITBOOK_ORGANIZATION=<id> npm run publish-integration
```

Publishing stops with a message if `GITBOOK_ORGANIZATION` is not set. The `organization` value in `gitbook-manifest.yaml` is only a placeholder that this variable replaces.
