---
description: Buttons, toggles and toolbars.
---

# Actions

## PixelButton

A button with a pixel border and a hard shadow. When pressed, it moves into its own shadow.

```tsx
import { PixelButton, Icon } from 'pixel-foundry';

<PixelButton onClick={start}><Icon name="plus" size={12} /> Press start</PixelButton>
<PixelButton variant="secondary">Secondary</PixelButton>
<PixelButton variant="outline">Outline</PixelButton>
<PixelButton variant="ghost">Ghost</PixelButton>
<PixelButton disabled>Unavailable</PixelButton>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style |
| `className` | `string` | | Extra classes |
| …rest | Base UI `Button` props | | `onClick`, `disabled`, `type`, `render`, … |

## PixelToggle

A single on/off button with a heart icon, for actions like "save" or "favorite".

```tsx
<PixelToggle label="Save" defaultPressed />
```

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `defaultPressed` | `boolean` | `false` |

## PixelToggleGroup

A row of toggle buttons, for quick filters for example. Only one button can be pressed at a time (Base UI's default), and the value is reported as an array. Arrow keys move between buttons.

```tsx
<PixelToggleGroup
  label="Pricing"
  defaultValue="free"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
    { value: 'trial', label: 'Trial' },
  ]}
  onValueChange={(values) => setPricing(values)}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Accessible name of the group |
| `options` | `{ value: string; label: string }[]` | Buttons to show |
| `defaultValue` | `string` | Initially pressed value |
| `value` | `string[]` | Controlled pressed values |
| `onValueChange` | `(values: string[]) => void` | Called when the selection changes |

## PixelToolbar

A row of icon buttons with arrow-key navigation between them.

```tsx
<PixelToolbar
  label="Listing actions"
  actions={[
    { label: 'Copy link', icon: 'copy', onClick: copyLink },
    { label: 'Save', icon: 'heart', onClick: save },
    { label: 'Share', icon: 'external', onClick: share },
  ]}
/>
```

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `actions` | `{ label: string; icon: IconName; onClick: () => void }[]` |

Each action's `label` becomes the button's accessible name. See [Icons](icons.md) for the available `icon` values.
