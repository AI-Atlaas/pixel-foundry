---
description: Avatars, meters, separators, scroll areas and collapsibles.
---

# Display

## PixelAvatar

Shows an image, or the initials if there's no image or it fails to load.

```tsx
<PixelAvatar label="Moss Notes" initials="MN" src="/logos/moss.svg" />
```

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Accessible name |
| `initials` | `string` | Fallback text |
| `src` | `string` | Optional image URL |

## PixelMeter

Shows a measured value within a known range, such as a rating or storage used. For task progress, use Base UI's `Progress` instead (see [Styling raw Base UI parts](styling-base-ui.md#progress)).

```tsx
<PixelMeter label="Rating" value={4.6} max={5} unit="stars" />
```

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | |
| `value` | `number` | Clamped to `0…max` |
| `max` | `number` | |
| `unit` | `string` | Optional, read by screen readers ("4.6 out of 5 stars") |

## PixelSeparator

```tsx
<PixelSeparator />
<PixelSeparator orientation="vertical" />
```

| Prop | Type | Default |
| --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |

## PixelScrollArea

A scroll container with a pixel scrollbar. Give it a height with CSS.

```tsx
<PixelScrollArea label="Changelog">
  {entries.map((e) => <p key={e.id}>{e.text}</p>)}
</PixelScrollArea>
```

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Accessible name of the scroll region |
| `children` | `ReactNode` | |

## PixelCollapsible

A button that shows and hides a panel.

```tsx
<PixelCollapsible label="Show details">
  <p>Hidden until opened.</p>
</PixelCollapsible>
```

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `children` | `ReactNode` |

## Badges

Badges are a CSS class, not a component:

```tsx
<span className="px-badge">In progress</span>
<span className="px-badge success">Online</span>
<span className="px-badge warning">Rare item</span>
```
