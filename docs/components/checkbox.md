---
description: A labelled checkbox. The whole row is clickable.
---

# Checkbox

{% @pixel-foundry/demo demo="checkbox" %}

## Import

```tsx
import { PixelCheckbox } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
<PixelCheckbox defaultChecked>Remember my progress</PixelCheckbox>
<PixelCheckbox checked={agree} onCheckedChange={setAgree}>I agree</PixelCheckbox>
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | The visible label. The whole row is clickable |
| …rest | Base UI `Checkbox.Root` props | `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `name`, `value`, … |
