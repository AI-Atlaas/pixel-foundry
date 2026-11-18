---
description: A single on/off button for actions like save or follow.
---

# Toggle

![A pressed Save toggle next to an unpressed Follow toggle](../../.gitbook/assets/components/toggle.png)

A single on/off button with a heart icon, for actions like "save" or "favorite".

## Import

```tsx
import { PixelToggle } from 'pixel-foundry';
```

## Usage

```tsx
<PixelToggle label="Save" defaultPressed />
```

## Props

| Prop | Type | Default |
| --- | --- | --- |
| `label` | `string` | |
| `defaultPressed` | `boolean` | `false` |
