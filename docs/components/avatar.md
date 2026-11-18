---
description: An image with an initials fallback.
---

# Avatar

![Two initials avatars next to a product name](../.gitbook/assets/components/avatar.png)

Shows an image, or the initials if there's no image or it fails to load.

## Import

```tsx
import { PixelAvatar } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
<PixelAvatar label="Moss Notes" initials="MN" src="/logos/moss.svg" />
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Accessible name |
| `initials` | `string` | Fallback text |
| `src` | `string` | Optional image URL |
