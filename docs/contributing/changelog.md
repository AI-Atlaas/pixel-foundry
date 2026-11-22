---
description: Release history.
---

# Changelog

## 0.1.1 (2026-11-22)

No changes to components, styles or themes.

* Releases now publish to npm from GitHub Actions with npm trusted publishing, so each version carries a provenance statement.

## 0.1.0 (2026-11-18)

First release as a standalone npm package, extracted from the Pixel Foundry playground.

**Added**

* 31 React components built on Base UI: 6 core wrappers and 25 extended components.
* `Icon`, with 23 Pixelarticons icons and typed names (`IconName`, `iconNames`).
* `ClickEffects` for decorative click sparks.
* Five palettes with light and dark modes, shipped as `@ai-atlaas/pixel-foundry/themes/*.css`.
* `applyTheme()` for runtime theming and `presetCSS()` for build-time CSS. Both are also exported from the React-free `@ai-atlaas/pixel-foundry/theme` entry.
* Self-hosted Pixelify Sans and IBM Plex Mono fonts.
* A WCAG AA contrast test for every palette.

**Changed (compared with the playground source)**

* `PixelModal`: the hard-coded eyebrow label is now an optional `eyebrow` prop, and `description` is optional.
* `PixelButton`: `variant` is typed as `'primary' | 'secondary' | 'outline' | 'ghost'`.
* `PixelAutocomplete`: new `placeholder` prop.
* `PixelContextMenu`: new `menuLabel` prop for the keyboard-accessible menu button.
* `PixelOTPField`: neutral hint text.
* `styles.css` now sets the page background and text color from the theme.

**Removed**

* Playground-only pieces: the product form demo, the plant illustration and the raw Base UI re-exports. Import Base UI parts from `@base-ui/react` directly.
