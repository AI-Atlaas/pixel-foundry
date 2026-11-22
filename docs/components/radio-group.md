---
description: A controlled radio group with a visible group label.
---

# Radio group

{% @pixel-foundry/demo demo="radio-group" %}

A controlled radio group with a visible group label.

## Import

```tsx
import { PixelRadioGroup } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
const [billing, setBilling] = useState('monthly');

<PixelRadioGroup
  label="Billing"
  value={billing}
  onValueChange={setBilling}
  options={[
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly (save 20%)' },
  ]}
/>
```

## Props

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `options` | `{ value: string; label: string }[]` |
| `value` | `string` |
| `onValueChange` | `(value: string) => void` |
