---
description: The ideas behind Pixel Foundry's look and feel.
---

# Principles

A pixel interface needs more than a retro font. Pixel Foundry is built on four ideas.

## 1. Geometry carries the character

The pixel feel should survive a font change. It comes from shape, not typography:

* **Square silhouettes.** `--radius` is `0px`.
* **Integer borders.** `--pixel` is 1, 2 or 3 CSS pixels and sets the main component borders.
* **Hard shadows.** `--pixel-shadow` is an offset from 0 to 8px with zero blur.
* **Bitmap details.** Icons, cursors and focus outlines sit on a pixel grid and render with `crispEdges`.

Border width and shadow depth are separate settings on purpose: thick borders don't have to mean deep shadows. Small secondary rules and separators stay thin to keep the hierarchy readable. Note that `--pixel` doesn't resample the whole page or every decorative graphic.

## 2. A small, semantic palette

Each palette has a surface, paper, ink, muted text and one primary action color. Success, warning and destructive tokens each have their own meaning and are shared across palettes. The tokens use shadcn/ui names, so one palette change spreads through the whole system, including any shadcn components.

See [Palettes](palettes.md) and [Design tokens](tokens.md).

## 3. Pixel display, readable body

**Pixelify Sans** is for headings and display text only. **IBM Plex Mono** carries labels, controls, code and body copy. Long paragraphs in a pixel font are tiring to read, so the display face stays at the top of the hierarchy. See [Typography](typography.md).

## 4. Tactile, honest interaction

* A pressed button **moves into its own shadow**.
* Selected controls use a fill, an indicator, or both. Meaning never depends on color alone.
* Focus is a **dashed, offset outline** that wrappers never clip.
* Animation is never required for meaning, and it switches off when the user asks for reduced motion.

Behavior comes from Base UI: dialog focus trapping, list selection, menu keyboard movement, radio and tab relationships. Pixel Foundry only adds the look. See [Accessibility](accessibility.md).

## Layers

```
┌──────────────────────────────────────────────┐
│  Your app                                    │
├──────────────────────────────────────────────┤
│  pixel-foundry React wrappers  (optional)    │
├──────────────────────────────────────────────┤
│  styles.css: px-* classes + state selectors │
├──────────────────────────────────────────────┤
│  themes/*.css or applyTheme(): CSS tokens   │
├──────────────────────────────────────────────┤
│  @base-ui/react: behavior & accessibility   │
└──────────────────────────────────────────────┘
```

Each layer can be replaced on its own. You can use the tokens without the classes, use the classes without the wrappers, or swap a theme without touching components.
