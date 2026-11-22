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
├── scripts/build-styles.mjs
├── test/theme.test.mjs
├── docs/                 this GitBook documentation
├── gitbook-integration/  the GitBook integration behind the live demos
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

Releases publish to npm automatically. Publishing a GitHub Release runs `.github/workflows/publish.yml`, which installs dependencies and runs `npm publish`. `prepublishOnly` type-checks, builds and tests the package first, so a failing check stops the release.

The workflow uses npm **trusted publishing**: npm verifies the workflow through GitHub's OIDC token, so no npm token is stored in the repository. The trusted publisher is configured in the package's settings on npmjs.com, for the `AI-Atlaas/pixel-foundry` repository, the `publish.yml` workflow and the `production` environment. The workflow's job runs in the GitHub environment `production` to match. If the workflow file or the environment is renamed, update that setting too.

You can add protection rules to the `production` environment in the repository's **Settings → Environments**, for example a required reviewer, so each publish waits for approval.

To release a new version:

1. Bump the version. This updates `package.json` and `package-lock.json`, and creates a commit and a tag such as `v0.2.0`:

   ```bash
   npm version minor   # or patch / major
   ```

2. Push the commit and the tag:

   ```bash
   git push --follow-tags
   ```

3. On GitHub, create a release from the new tag and publish it. Write the release notes there, and add them to the [Changelog](changelog.md).
4. Watch the **Publish to npm** run in the repository's **Actions** tab.

The workflow stops if the release tag doesn't match the version in `package.json`, so a release can't publish the wrong version. A version number can never be reused on npm, and a version can only be unpublished within 72 hours.

The package is published under the **AI Atlaas** npm organization as `@ai-atlaas/pixel-foundry`. `publishConfig.access` is set to `public` in `package.json`, because scoped packages are private by default.

## Docs

The `docs/` folder is synced to GitBook with site-wide **Git Sync**, using `docs/` as the Project directory. `docs/gitbook-docs.yaml` describes the site's sections and maps the Pixel Foundry space to the `docs/` folder. `docs/README.md` is the home page and `docs/SUMMARY.md` defines the navigation.

Edits made in GitBook come back as commits on `main`, so pull before editing the docs locally.

## Live demos

Each component page starts with a live demo. The demos come from a GitBook integration in `gitbook-integration/`, published privately to the GitBook organization that owns these docs, under the name `pixel-foundry`. It adds a **Pixel Foundry demo** block. The block shows a frame that the integration serves from GitBook's own hosting, with the compiled demo, React, Base UI, the package's CSS and its fonts. Nothing is installed or built when a page opens.

In Markdown, a block is one line, where `demo` is the demo's id:

```
{% @pixel-foundry/demo demo="select" %}
```

In the GitBook editor, insert it from the ( ⌘ + / ) menu and pick the demo from the block's menu.

The demos use the **published** package. `gitbook-integration/package.json` pins `@ai-atlaas/pixel-foundry` to an exact version, so the demos show what people can install.

| Path in `gitbook-integration/` | What it is |
| --- | --- |
| `frame/demos/<id>.tsx` | One demo per file. Each default-exports a small React component. |
| `frame/demos/demos.json` | The demo list: `id`, menu `title`, minimum frame `height` in pixels (room for its popup), and `top: true` to pin popup demos near the top. |
| `frame/main.tsx`, `frame/frame.css` | The page inside the frame: the light/dark toggle, auto-height, and layout helpers such as `demo-row`, `demo-stack` and `demo-wide`. |
| `src/index.tsx` | The GitBook block. |
| `src/serve.ts` | Serves the frame page and its assets. |
| `scripts/build-frames.mjs` | Compiles the frame into `src/generated/` (ignored by Git). |

To add or change a demo:

1. Write `frame/demos/<id>.tsx` and add it to `frame/demos/demos.json`.
2. Check it locally. This serves every demo on a stand-in page that sizes each frame the way GitBook does:

   ```bash
   cd gitbook-integration
   npm install
   npm run preview      # http://localhost:5182/
   npm run typecheck
   ```

3. Publish a new version of the integration. This needs a GitBook personal access token from an organization member, set once with `npx gitbook auth`. It also needs the organization's ID, the `<id>` in `app.gitbook.com/o/<id>/` (or run `npx gitbook organizations list`). The ID is kept out of the repo, so pass it when publishing:

   ```bash
   GITBOOK_ORGANIZATION=<id> npm run publish-integration
   ```

   Publishing stops with a message if `GITBOOK_ORGANIZATION` is not set. The `organization` value in `gitbook-manifest.yaml` is only a placeholder that this variable replaces.

4. Add `{% @pixel-foundry/demo demo="<id>" %}` to the page.

After a package release, bump the pinned version in `gitbook-integration/package.json`, run `npm install`, and publish the integration again.
