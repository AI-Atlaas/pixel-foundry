---
description: All Pixel Foundry components at a glance.
---

# Overview

Every component is a thin wrapper around [Base UI](https://base-ui.com) parts with Pixel Foundry classes applied. Import them all from the package root:

```tsx
import { PixelButton, PixelSelect, PixelDrawer } from 'pixel-foundry';
```

## Catalog

| Group | Components |
| --- | --- |
| [Actions](actions.md) | `PixelButton`, `PixelToggle`, `PixelToggleGroup`, `PixelToolbar` |
| [Forms](forms.md) | `PixelCheckbox`, `PixelCheckboxGroup`, `PixelSwitch`, `PixelRadioGroup`, `PixelSelect`, `PixelCombobox`, `PixelAutocomplete`, `PixelSlider`, `PixelRangeSlider`, `PixelNumberField`, `PixelOTPField`, `PixelFieldset` |
| [Overlays](overlays.md) | `PixelModal`, `PixelAlertDialog`, `PixelDrawer`, `PixelPopover`, `PixelPreviewCard`, `PixelTooltip`, `PixelToastTrigger` |
| [Menus & navigation](menus-and-navigation.md) | `PixelContextMenu`, `PixelMenubar`, `PixelNavigationMenu` |
| [Display](display.md) | `PixelAvatar`, `PixelMeter`, `PixelSeparator`, `PixelScrollArea`, `PixelCollapsible` |
| [Icons](icons.md) | `Icon` |
| Effects | `ClickEffects` (see [Cursors & effects](../design-system/cursors-and-effects.md)) |

## Conventions

* **Labels are required.** Most components take a `label` prop. It renders a visible label or becomes the accessible name, so every control can be identified by screen readers.
* **Controlled or uncontrolled.** Where it makes sense, components accept either `defaultValue` (uncontrolled) or `value` and `onValueChange` (controlled), following Base UI.
* **Portals.** Popups, menus, dialogs, drawers and toasts render in a portal at the end of `<body>`. Theme tokens set on `<html>` reach them automatically.
* **Typed props.** Every prop is typed, so your editor shows what each component accepts.

## When a wrapper doesn't fit

The wrappers are deliberately simple and opinionated. When you need a different structure, use Base UI directly and apply the `px-*` classes. See [Styling raw Base UI parts](styling-base-ui.md). You keep the look and get full control over the markup.
