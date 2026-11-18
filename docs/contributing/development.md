---
description: Work on Pixel Foundry locally, test it and publish a release.
---

# Development

## Setup

```bash
git clone https://github.com/AI-Atlaas/pixel-foundary.git
cd pixel-foundary
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
4. Document it in the right page under `docs/components/` and add it to the catalog in `docs/components/README.md`.

## Adding or changing a palette

1. Edit `presets` in `src/theme.ts`. Each mode has 8 colors in this order: background, card, foreground, muted-foreground, secondary, primary, primary-foreground, accent.
2. Run `npm run build && npm test`. The contrast test fails if any text pair drops below 4.5:1.
3. Update `docs/design-system/palettes.md`.

## Trying a build in another project

```bash
npm pack
cd ../my-app
npm install ../pixel-foundary/pixel-foundry-0.1.0.tgz
```

## Publishing

```bash
npm version patch   # or minor / major
npm login
npm publish
```

`prepublishOnly` runs the typecheck, build and tests first. Before the first publish, check that the name `pixel-foundry` is still available on npm.

## Docs

The `docs/` folder is a GitBook space. `.gitbook.yaml` at the repository root points GitBook at it, and `docs/SUMMARY.md` defines the navigation. To publish, connect the GitHub repository in GitBook through **Git Sync**.
