---
description: A small panel attached to a trigger button.
---

# Popover

{% @pixel-foundry/demo demo="popover" %}

A small panel attached to a trigger button with an info icon.

## Import

```tsx
import { PixelPopover } from '@ai-atlaas/pixel-foundry';
```

## Usage

```tsx
<PixelPopover trigger="How ranking works" title="Ranking" description="Sorted by recent votes." />
```

## Props

| Prop | Type |
| --- | --- |
| `trigger` | `string` |
| `title` | `string` |
| `description` | `string` |
| `children` | `ReactNode` (optional extra content) |
