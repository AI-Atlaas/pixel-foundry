---
description: An icon button with a tooltip.
---

# Tooltip

![A heart icon button with a Save to your shortlist tooltip](../.gitbook/assets/components/tooltip.png)

An icon button with a tooltip. The tooltip text describes the button, and `label` is its accessible name.

## Import

```tsx
import { PixelTooltip } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
<PixelTooltip
  label="Save"
  text="Save to your shortlist"
  icon="heart"
  onClick={toggleSave}
  expanded={false}
/>
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Accessible name of the button |
| `text` | `string` | Tooltip content |
| `icon` | `IconName` | Button icon |
| `onClick` | `() => void` | |
| `expanded` | `boolean` | Optional `aria-expanded`, for buttons that toggle a panel |

For a tooltip on any other element, use Base UI's `Tooltip` with `className="px-tooltip"` on the popup.
