---
description: A number input with minus and plus buttons.
---

# Number field

{% @pixel-foundry/demo demo="number-field" %}

A number input with − and + buttons and a hint showing the allowed range.

## Import

```tsx
import { PixelNumberField } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
<PixelNumberField label="Seats" min={1} max={50} defaultValue={5} />
```

## Props

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `min`, `max` | `number` | |
| `defaultValue` | `number` | |
| `step` | `number` | `1` |
