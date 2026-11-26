---
description: Release history.
---

# Changelog

## Unreleased

**Changed**

* Controls line up with the button sizes. `--control-height` is now 40px (comfortable) and 32px (compact), down from 42px and 34px, matching `md` and `sm` buttons. This applies to inputs, selects, toggles, number fields, toolbars and menubars.
* Toggles, menubar triggers, inputs and selects use less vertical padding, so they reach exactly 32px in compact mode. A toggle's minimum width now follows the control height too.

## 0.2.0 (2026-11-25)

**Added**

* `PixelButton` has a `size` prop: `sm` (32px), `md` (40px, the default) and `lg` (48px). The matching CSS classes are `px-button sm` and `px-button lg`.

**Changed**

* Buttons no longer follow `--control-height`. The default button is 40px tall at every density, instead of 42px (comfortable) or 34px (compact). This also applies to triggers styled with `px-button`.

## 0.1.2 (2026-11-22)

**Changed**

* Pixel cursors are smaller: 24×24 pixels instead of 32×32. Their click points stay on the arrow tip, the fingertip and the center of the I-beam.

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
