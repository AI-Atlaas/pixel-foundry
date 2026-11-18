---
description: All Pixel Foundry components at a glance.
---

# Overview

Every component is a thin wrapper around [Base UI](https://base-ui.com) parts with Pixel Foundry classes applied. Import them all from the package root:

```tsx
import { PixelButton, PixelSelect, PixelDrawer } from 'pixel-foundry';
```

## Catalog

Every component has its own page with a screenshot, usage example and props table.

| Group | Components |
| --- | --- |
| [Actions](actions/README.md) | [Button](actions/button.md) · [Toggle](actions/toggle.md) · [Toggle group](actions/toggle-group.md) · [Toolbar](actions/toolbar.md) |
| [Forms](forms/README.md) | [Checkbox](forms/checkbox.md) · [Checkbox group](forms/checkbox-group.md) · [Switch](forms/switch.md) · [Radio group](forms/radio-group.md) · [Select](forms/select.md) · [Combobox](forms/combobox.md) · [Autocomplete](forms/autocomplete.md) · [Slider](forms/slider.md) · [Range slider](forms/range-slider.md) · [Number field](forms/number-field.md) · [OTP field](forms/otp-field.md) · [Fieldset](forms/fieldset.md) · [Input](forms/input.md) |
| [Overlays](overlays/README.md) | [Modal](overlays/modal.md) · [Alert dialog](overlays/alert-dialog.md) · [Drawer](overlays/drawer.md) · [Popover](overlays/popover.md) · [Preview card](overlays/preview-card.md) · [Tooltip](overlays/tooltip.md) · [Toast](overlays/toast.md) |
| [Menus & navigation](menus-and-navigation/README.md) | [Context menu](menus-and-navigation/context-menu.md) · [Menubar](menus-and-navigation/menubar.md) · [Navigation menu](menus-and-navigation/navigation-menu.md) |
| [Display](display/README.md) | [Avatar](display/avatar.md) · [Meter](display/meter.md) · [Separator](display/separator.md) · [Scroll area](display/scroll-area.md) · [Collapsible](display/collapsible.md) · [Badge](display/badge.md) |
| [Icons](icons.md) | `Icon` |
| Effects | `ClickEffects` (see [Cursors & effects](../design-system/cursors-and-effects.md)) |

## Conventions

* **Labels are required.** Most components take a `label` prop. It renders a visible label or becomes the accessible name, so every control can be identified by screen readers.
* **Controlled or uncontrolled.** Where it makes sense, components accept either `defaultValue` (uncontrolled) or `value` and `onValueChange` (controlled), following Base UI.
* **Portals.** Popups, menus, dialogs, drawers and toasts render in a portal at the end of `<body>`. Theme tokens set on `<html>` reach them automatically.
* **Typed props.** Every prop is typed, so your editor shows what each component accepts.

## When a wrapper doesn't fit

The wrappers are deliberately simple and opinionated. When you need a different structure, use Base UI directly and apply the `px-*` classes. See [Styling raw Base UI parts](styling-base-ui.md). You keep the look and get full control over the markup.
