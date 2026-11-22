---
description: Pixel cursors and click sparks.
---

# Cursors & effects

## Pixel cursors

Pixel Foundry includes five bitmap cursors, drawn as 16×16 SVGs in the current palette's accent and ink colors and shown at 24×24 pixels:

| Cursor | Where it appears |
| --- | --- |
| Arrow | Anywhere on the page |
| Pointer | Buttons, links, checkboxes, switches, radios, menu items |
| Text | Text inputs and text areas |
| Grab | Sliders (`grabbing` while dragging) |
| Blocked | Disabled controls |

Each cursor falls back to the matching system cursor. On touch screens (`pointer: coarse`), the browser's default cursor is used.

To turn pixel cursors off:

```ts
applyTheme({ pixelCursor: false });
```

or in CSS:

```css
:root {
  --cursor-arrow: auto;
  --cursor-pointer: pointer;
  --cursor-text: text;
  --cursor-grab: grab;
  --cursor-blocked: not-allowed;
}
```

## Click sparks

`ClickEffects` adds a small burst of pixel particles at each mouse click. It's purely decorative.

```tsx
import { ClickEffects } from '@ai-atlaas/pixel-foundry';

export function App() {
  return (
    <>
      <ClickEffects enabled />
      {/* … */}
    </>
  );
}
```

| Prop | Type | Description |
| --- | --- | --- |
| `enabled` | `boolean` | Turns the effect on or off |

Click sparks:

* are skipped for touch input and when the user prefers reduced motion,
* don't track the cursor or intercept clicks or typing,
* remove themselves after 650 ms.

Render `ClickEffects` once, near the root of your app.
