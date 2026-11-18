---
description: All Pixel Foundry components at a glance.
---

# Overview

Every component is a thin wrapper around [Base UI](https://base-ui.com) parts with Pixel Foundry classes applied. Import them all from the package root:

```tsx
import { PixelButton, PixelSelect, PixelDrawer } from '@ai-atlaas/pixel-foundry';
```

## Catalog

Every component has its own page with a screenshot, usage example and props table.

| Group | Components |
| --- | --- |
| Actions | [Button](button.md) · [Toggle](toggle.md) · [Toggle group](toggle-group.md) · [Toolbar](toolbar.md) |
| Forms | [Checkbox](checkbox.md) · [Checkbox group](checkbox-group.md) · [Switch](switch.md) · [Radio group](radio-group.md) · [Select](select.md) · [Combobox](combobox.md) · [Autocomplete](autocomplete.md) · [Slider](slider.md) · [Range slider](range-slider.md) · [Number field](number-field.md) · [OTP field](otp-field.md) · [Fieldset](fieldset.md) · [Input](input.md) |
| Overlays | [Modal](modal.md) · [Alert dialog](alert-dialog.md) · [Drawer](drawer.md) · [Popover](popover.md) · [Preview card](preview-card.md) · [Tooltip](tooltip.md) · [Toast](toast.md) |
| Menus & navigation | [Context menu](context-menu.md) · [Menubar](menubar.md) · [Navigation menu](navigation-menu.md) |
| Display | [Avatar](avatar.md) · [Meter](meter.md) · [Separator](separator.md) · [Scroll area](scroll-area.md) · [Collapsible](collapsible.md) · [Badge](badge.md) |
| [Icons](icons.md) | `Icon` |
| Effects | `ClickEffects` (see [Cursors & effects](../design-system/cursors-and-effects.md)) |

## Conventions

* **Labels are required.** Most components take a `label` prop. It renders a visible label or becomes the accessible name, so every control can be identified by screen readers.
* **Controlled or uncontrolled.** Where it makes sense, components accept either `defaultValue` (uncontrolled) or `value` and `onValueChange` (controlled), following Base UI.
* **Portals.** Popups, menus, dialogs, drawers and toasts render in a portal at the end of `<body>`. Theme tokens set on `<html>` reach them automatically.
* **Overlays.** Overlays trap or return focus as needed and close with <kbd>Esc</kbd>. Base UI handles that behavior.
* **Typed props.** Every prop is typed, so your editor shows what each component accepts.

## When a wrapper doesn't fit

The wrappers are deliberately simple and opinionated. When you need a different structure, use Base UI directly and apply the `px-*` classes. See [Styling raw Base UI parts](styling-base-ui.md). You keep the look and get full control over the markup.

## Shared types

Menu components share one action type, and the navigation menu has its own link type. Both are exported:

```ts
import type { MenuAction, NavigationLink } from '@ai-atlaas/pixel-foundry';

type MenuAction = { label: string; onSelect: () => void };
type NavigationLink = { label: string; href: string; description?: string };
```

For a single dropdown button, use Base UI's `Menu` with Pixel Foundry classes. See [Styling raw Base UI parts](styling-base-ui.md#menu).
