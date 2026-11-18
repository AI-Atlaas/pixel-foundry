---
description: Site navigation with dropdown panels of links.
---

# Navigation menu

![A navigation menu with the Discover panel open](../.gitbook/assets/components/navigation-menu.png)

Site navigation with dropdown panels of links, suited to a landing-page header.

## Import

```tsx
import { PixelNavigationMenu } from '@ai-atlaas/pixel-foundry';
```

## Usage

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

## Props

| Prop | Type |
| --- | --- |
| `label` | `string` |
| `groups` | `{ label: string; links: NavigationLink[] }[]` |

`NavigationLink` is `{ label: string; href: string; description?: string }`, and it is exported as a type.
