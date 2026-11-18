---
description: Requirements and framework-specific setup.
---

# Installation

## Requirements

| Requirement | Version |
| --- | --- |
| React and React DOM | 18 or 19 |
| `@base-ui/react` | 1.7 or newer (peer dependency) |
| Bundler | Any bundler that can import CSS from `node_modules` and resolve `url()` assets (Vite, Next.js, webpack, Parcel, …) |

`pixelarticons` is installed automatically as a dependency.

## What the package contains

| Import path | Contents |
| --- | --- |
| `@ai-atlaas/pixel-foundry` | React components, `Icon`, `ClickEffects` and the theme helpers |
| `@ai-atlaas/pixel-foundry/theme` | Theme helpers only. No React, so you can use them on the server or in build scripts |
| `@ai-atlaas/pixel-foundry/styles.css` | Component styles and `@font-face` rules |
| `@ai-atlaas/pixel-foundry/themes/<name>.css` | One palette: light tokens on `:root`, dark tokens on `.dark` |
| `@ai-atlaas/pixel-foundry/fonts/*` | The font files and their licenses |

## Next.js (App Router)

Import the CSS in your root layout:

```tsx
// app/layout.tsx
import '@ai-atlaas/pixel-foundry/styles.css';
import '@ai-atlaas/pixel-foundry/themes/night-garden.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="root">{children}</div>
      </body>
    </html>
  );
}
```

The component bundle is marked `"use client"`, so you can render Pixel Foundry components directly inside Server Components. To call them with event handlers, use them from your own client components.

## Vite + React

```tsx
// src/main.tsx
import '@ai-atlaas/pixel-foundry/styles.css';
import '@ai-atlaas/pixel-foundry/themes/night-garden.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<App />);
```

Vite copies the font files into your build output automatically.

## Recommended global CSS

Base UI recommends two global rules so that popups, menus and dialogs stack correctly above your page and backdrops cover the screen on iOS Safari:

```css
/* Your app's root element: #root in Vite, a wrapper div in Next.js */
.root, #root {
  isolation: isolate;
}

body {
  position: relative;
}
```

## What the stylesheet sets globally

`styles.css` is mostly scoped to `px-*` classes, but it also sets a few global rules so the whole page matches the theme:

* `body`: background, text color, base font size (16px desktop, 14px mobile), and the pixel arrow cursor.
* Pixel cursors on links, buttons, text fields and disabled controls.
* `@font-face` for **Pixelify Sans** and **IBM Plex Mono**.

To keep your own body styles, import your stylesheet **after** Pixel Foundry's.

{% hint style="warning" %}
Import only **one** theme file. Each one defines the same variables, so the last one imported wins.
{% endhint %}
