---
description: Every CSS variable Pixel Foundry defines.
---

# Design tokens

All styling reads from CSS custom properties. They're defined by a theme file or by `applyTheme()`, and you can override any of them.

## Color

The color names match [shadcn/ui](https://ui.shadcn.com/docs/theming): each surface has a matching `-foreground` token for text on that surface.

| Token | Used for |
| --- | --- |
| `--background` / `--foreground` | Page background and main text |
| `--card` / `--card-foreground` | Raised surfaces: dialogs, popups, cards |
| `--popover` / `--popover-foreground` | Floating surfaces (same as card) |
| `--primary` / `--primary-foreground` | Main actions, selected states, slider fill |
| `--secondary` / `--secondary-foreground` | Secondary buttons, subtle fills |
| `--muted` / `--muted-foreground` | Disabled fills, helper text |
| `--accent` / `--accent-foreground` | Hover highlights |
| `--border` | Pixel borders (same as foreground, for maximum definition) |
| `--input` | Input borders in their resting state |
| `--ring` | Focus outlines |
| `--destructive` / `--destructive-foreground` | Errors and dangerous actions |
| `--success` | Positive status, confirmations |
| `--warning` | Caution status |
| `--shadow-color` | Hard shadow color |

See [Palettes](palettes.md) for the values in each theme.

## Geometry

| Token | Default | Range | Effect |
| --- | --- | --- | --- |
| `--radius` | `0px` | | Corner radius. Pixels are square |
| `--pixel` | `2px` | `1px`–`3px` | Main border width |
| `--pixel-shadow` | `4px` | `0px`–`8px` | Hard shadow offset |
| `--control-height` | `42px` | `42px` comfortable, `34px` compact | Minimum height of buttons, inputs and selects |

## Typography

| Token | Default |
| --- | --- |
| `--font-pixel` | `"Pixelify Sans", monospace` |
| `--font-body` | `"IBM Plex Mono", monospace` |
| `--desktop-font-size` | `16px` |
| `--mobile-font-size` | `14px` (below 760px) |
| `--text-base` | Body size, follows the two values above |
| `--text-label` | `14px` desktop, `13px` mobile |
| `--text-small` | `12px` |
| `--text-meta` | `11px` desktop, `10px` mobile |
| `--type-scale` | `1.333` desktop, `1.167` mobile. Multiplies compact control text |

`--text-*` and `--type-scale` are defined in `styles.css`. The others come from the theme.

## Cursors

| Token | Used on | Fallback |
| --- | --- | --- |
| `--cursor-arrow` | Page | `auto` |
| `--cursor-pointer` | Buttons, links, checkable controls | `pointer` |
| `--cursor-text` | Text inputs | `text` |
| `--cursor-grab` | Sliders | `grab` |
| `--cursor-blocked` | Disabled controls | `not-allowed` |

The values are SVG data URIs drawn in the current palette. See [Cursors & effects](cursors-and-effects.md).

## Reading tokens in JavaScript

```ts
import { tokens, defaults } from '@ai-atlaas/pixel-foundry/theme';

const t = tokens({ ...defaults, preset: 'arcade', dark: true });
t['--primary']; // '#c6a0ff'
```
