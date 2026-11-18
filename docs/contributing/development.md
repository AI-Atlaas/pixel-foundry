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
| `npm pack` | Builds `pixel-foundry-<version>.tgz`, exactly what npm would publish |

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
└── tsup.config.ts
```

## Adding a component

1. Write the wrapper in `src/extras.tsx`. Compose Base UI parts and apply `px-*` classes, and require a `label` or `children` for the accessible name.
2. Add any new styles to `styles/components.css`. Use tokens (`var(--primary)`, `var(--pixel)`, …), never hard-coded colors.
3. Run `npm run typecheck && npm run build`.
4. Add a page for it in `docs/components/`, for example `docs/components/date-field.md`. Follow the existing pages: a screenshot, then **Import**, **Usage** and **Props** sections.
5. Add the screenshot to `docs/.gitbook/assets/components/`, using the same file name as the page.
6. Link the page in `docs/SUMMARY.md` (components are listed alphabetically) and in the catalog in `docs/components/README.md`.

## Adding or changing a palette

1. Edit `presets` in `src/theme.ts`. Each mode has 8 colors in this order: background, card, foreground, muted-foreground, secondary, primary, primary-foreground, accent.
2. Run `npm run build && npm test`. The contrast test fails if any text pair drops below 4.5:1.
3. Update `docs/design-system/palettes.md`.

## Trying a build in another project

```bash
npm pack
cd ../my-app
npm install ../pixel-foundry/pixel-foundry-0.1.0.tgz
```

## Publishing

```bash
npm version patch   # or minor / major
npm login
npm publish
```

`prepublishOnly` runs the typecheck, build and tests first. Before the first publish, check that the name `pixel-foundry` is still available on npm.

## Docs

The `docs/` folder is synced to GitBook with site-wide **Git Sync**, using `docs/` as the Project directory. `docs/gitbook-docs.yaml` describes the site's sections and maps the Pixel Foundry space to the `docs/` folder. `docs/README.md` is the home page and `docs/SUMMARY.md` defines the navigation.

Edits made in GitBook come back as commits on `main`, so pull before editing the docs locally.
