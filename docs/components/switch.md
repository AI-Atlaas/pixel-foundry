---
description: An on/off switch with a visible label.
---

# Switch

{% @pixel-foundry/demo demo="switch" %}

## Import

```tsx
import { PixelSwitch } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
<PixelSwitch label="Sound effects" defaultChecked />
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Visible label, shown before the switch |
| …rest | Base UI `Switch.Root` props | `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, … |
