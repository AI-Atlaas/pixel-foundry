---
description: A small panel attached to a trigger button.
---

# Popover

![A Ranking popover open below its trigger](../.gitbook/assets/components/popover.png)

A small panel attached to a trigger button with an info icon.

## Import

```tsx
import { PixelPopover } from 'pixel-foundry';
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
