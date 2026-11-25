---
description: A button with a pixel border and a hard shadow.
---

# Button

{% @pixel-foundry/demo demo="button" %}

A button with a pixel border and a hard shadow. When pressed, it moves into its own shadow.

## Import

```tsx
import { PixelButton } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
import { PixelButton, Icon } from '@ai-atlaas/pixel-foundry';

<PixelButton onClick={start}><Icon name="plus" size={12} /> Press start</PixelButton>
<PixelButton variant="secondary">Secondary</PixelButton>
<PixelButton variant="outline">Outline</PixelButton>
<PixelButton variant="ghost">Ghost</PixelButton>
<PixelButton disabled>Unavailable</PixelButton>
```

## Sizes

Buttons come in three heights. `md` is the default.

```tsx
<PixelButton size="sm">Small</PixelButton>   {/* 32px */}
<PixelButton>Medium</PixelButton>            {/* 40px */}
<PixelButton size="lg">Large</PixelButton>   {/* 48px */}
```

`sm` also uses slightly smaller text. Without React, add the `sm` or `lg` class: `<button class="px-button sm">`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height: 32px, 40px or 48px |
| `className` | `string` | | Extra classes |
| …rest | Base UI `Button` props | | `onClick`, `disabled`, `type`, `render`, … |
