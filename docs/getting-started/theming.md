---
description: Pick a palette, override tokens, or theme at runtime.
---

# Theming

Pixel Foundry is themed with CSS custom properties. You can set them in three ways, from simplest to most flexible.

## 1. Static theme file

Import one of the five ready-made palettes:

```tsx
import '@ai-atlaas/pixel-foundry/themes/parchment.css';
```

The light tokens live on `:root` and the dark tokens on `.dark` or `[data-theme="dark"]`, so dark mode is a single class:

```ts
document.documentElement.classList.toggle('dark');
```

To follow the operating-system setting, toggle the class from `matchMedia('(prefers-color-scheme: dark)')`, or use a library such as `next-themes` with `attribute="class"`.

## 2. Override tokens in CSS

Every token can be overridden after the theme import:

```css
:root {
  --primary: #ff5fa2;            /* custom accent */
  --primary-foreground: #000000; /* readable text on the accent */
  --pixel: 3px;                  /* thicker borders */
  --pixel-shadow: 6px;           /* deeper shadows */
  --control-height: 32px;        /* compact controls */
}
```

See [Design tokens](../design-system/tokens.md) for the full list.

## 3. Runtime theming with `applyTheme`

`applyTheme` writes every token as an inline CSS variable on `<html>` (or any element you pass). Use it for theme pickers and user preferences:

```ts
import { applyTheme } from '@ai-atlaas/pixel-foundry';

applyTheme({
  preset: 'ocean',     // night-garden | parchment | pocket | arcade | ocean
  dark: false,
  pixel: 3,            // border width: 1, 2 or 3
  shadow: 6,           // shadow offset: 0–8
  density: 'compact',  // comfortable (40px controls) | compact (32px)
  accent: '#ff5fa2',   // optional custom primary; '' uses the preset's
  pixelCursor: true,   // bitmap cursors on/off
});
```

Any setting you leave out uses the default:

| Setting | Default |
| --- | --- |
| `preset` | `'night-garden'` |
| `dark` | `true` |
| `pixel` | `2` |
| `shadow` | `4` |
| `density` | `'comfortable'` |
| `accent` | `''` (preset color) |
| `pixelCursor` | `true` |

When you pass a custom `accent`, Pixel Foundry picks black or white text for it automatically, whichever has the stronger contrast. It also toggles the `dark` class and `color-scheme` on the element.

{% hint style="info" %}
`applyTheme` writes inline styles, which override the theme files. You can use both: a theme file for the first paint, then `applyTheme` once the user's saved preference loads.
{% endhint %}

### Persisting a user's choice

```ts
import { applyTheme, type Settings } from '@ai-atlaas/pixel-foundry';

const saved = JSON.parse(localStorage.getItem('theme') ?? '{}') as Partial<Settings>;
applyTheme(saved);

export function setTheme(next: Partial<Settings>) {
  const merged = { ...saved, ...next };
  localStorage.setItem('theme', JSON.stringify(merged));
  applyTheme(merged);
}
```

## Generating CSS (server or build time)

`@ai-atlaas/pixel-foundry/theme` has no React or DOM dependency:

```ts
import { presets, tokens, presetCSS, exportCSS } from '@ai-atlaas/pixel-foundry/theme';

presets.map((p) => p.id);         // ['night-garden', 'parchment', …]
tokens({ ...settings });          // Record<'--token', value> for one mode
presetCSS('arcade', { pixel: 3 }); // full light + dark stylesheet as a string
exportCSS({ ...settings });       // one :root block for the given settings
```

Use `presetCSS` to ship a custom geometry variant as a static file, or `tokens` to inline variables in a server-rendered `<html style>`.

## Using the palette with shadcn/ui

The color tokens use the same names as shadcn/ui (`--background`, `--primary`, `--muted-foreground`, …). If your project also uses shadcn components, they pick up the palette automatically. They won't gain pixel borders or hard shadows, because those come from the `px-*` classes.
