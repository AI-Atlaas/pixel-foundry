---
description: An on/off switch with a visible label.
---

# Switch

![Sound effects switch on and Music switch off](../.gitbook/assets/components/switch.png)

## Import

```tsx
import { PixelSwitch } from 'pixel-foundry';
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
