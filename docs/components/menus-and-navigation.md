---
description: Context menus, menubars and navigation menus.
---

# Menus & navigation

Menus share one action type:

```ts
import type { MenuAction } from 'pixel-foundry';

type MenuAction = { label: string; onSelect: () => void };
```

## PixelContextMenu

Shows a menu on right-click or long-press of its children. Right-click can't be reached by keyboard or by everyone on touch, so the component also renders a regular menu button with the same actions.

```tsx
<PixelContextMenu
  menuLabel="Listing actions"
  actions={[
    { label: 'Open', onSelect: open },
    { label: 'Copy link', onSelect: copy },
    { label: 'Report', onSelect: report },
  ]}
>
  <div>Right-click this card</div>
</PixelContextMenu>
```

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | |
| `actions` | `MenuAction[]` | |
| `menuLabel` | `string` | `'Actions'` |

## PixelMenubar

A desktop-style menu bar. Use the arrow keys to move between menus and items.

```tsx
<PixelMenubar
  label="Editor"
  groups={[
    { label: 'File', actions: [{ label: 'New', onSelect: create }, { label: 'Export', onSelect: exportFile }] },
    { label: 'View', actions: [{ label: 'Grid', onSelect: showGrid }, { label: 'List', onSelect: showList }] },
  ]}
/>
```

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `groups` | `{ label: string; actions: MenuAction[] }[]` |

## PixelNavigationMenu

Site navigation with dropdown panels of links, suited to a landing-page header.

```tsx
<PixelNavigationMenu
  label="Main"
  groups={[
    {
      label: 'Discover',
      links: [
        { label: 'New launches', href: '/new', description: 'Fresh this week' },
        { label: 'Top rated', href: '/top' },
      ],
    },
    { label: 'For makers', links: [{ label: 'Submit a product', href: '/submit' }] },
  ]}
/>
```

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `groups` | `{ label: string; links: NavigationLink[] }[]` |

`NavigationLink` is `{ label: string; href: string; description?: string }`, and it is exported as a type.

## Plain dropdown menu

For a single dropdown button, use Base UI's `Menu` with Pixel Foundry classes. See [Styling raw Base UI parts](styling-base-ui.md#menu).
