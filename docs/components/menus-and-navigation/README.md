---
description: Context menus, menubars and navigation menus.
---

# Menus & navigation

Menus share one action type:

```ts
import type { MenuAction } from 'pixel-foundry';

type MenuAction = { label: string; onSelect: () => void };
```

| Component | What it is |
| --- | --- |
| [Context menu](context-menu.md) | A right-click menu with a keyboard-accessible menu button. |
| [Menubar](menubar.md) | A desktop-style menu bar. |
| [Navigation menu](navigation-menu.md) | Site navigation with dropdown panels of links. |

## Plain dropdown menu

For a single dropdown button, use Base UI's `Menu` with Pixel Foundry classes. See [Styling raw Base UI parts](../styling-base-ui.md#menu).
