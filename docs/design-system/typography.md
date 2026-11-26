---
description: Fonts, sizes and hierarchy.
---

# Typography

## Two typefaces, two jobs

| Font | Token | Used for |
| --- | --- | --- |
| **Pixelify Sans** | `--font-pixel` | Headings, dialog titles, display text |
| **IBM Plex Mono** | `--font-body` | Body copy, labels, controls, code |

Both fonts are bundled with the package and load through `@font-face` in `styles.css`. See [Fonts](../resources/fonts.md) for licenses.

Use the pixel face sparingly. Long paragraphs in a pixel font are hard to read, so keep it for the top of the hierarchy:

```css
h1, h2, .display { font-family: var(--font-pixel); }
```

## Scale

| Role | Desktop | Mobile (≤ 760px) | Token |
| --- | --- | --- | --- |
| Body, paragraphs, main button labels | 16px | 14px | `--text-base` |
| Labels, helper text | 14px | 13px | `--text-label` |
| Small text | 12px | 12px | `--text-small` |
| Metadata | 11px | 10px | `--text-meta` |

Reading text uses a line height of about 1.75.

## Density

`--control-height` sets the height of inputs, selects, toggles, toolbars and menubars:

* **Comfortable** (`40px`, default): roomy and touch-friendly. Matches a default (`md`) button.
* **Compact** (`32px`): for dense desktop tools. Matches a small (`sm`) button.

Compact mode changes controls only, not the page zoom or text size. Keep touch targets large enough on mobile.

Buttons don't change with density. They have three fixed heights on the same scale: 32px (`sm`), 40px (`md`, the default) and 48px (`lg`). In compact mode, use `size="sm"` buttons to line up with the other controls. See [Button](../components/button.md#sizes).

## Using your own fonts

Override the tokens after importing the styles:

```css
:root {
  --font-pixel: "Press Start 2P", monospace;
  --font-body: "JetBrains Mono", monospace;
}
```

The bundled `@font-face` rules only download a font when it is actually used, so unused fonts cost nothing.
