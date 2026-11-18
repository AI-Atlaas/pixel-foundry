---
description: Install Pixel Foundry and render your first pixel component.
---

# Quick start

## 1. Install

{% tabs %}
{% tab title="npm" %}
```bash
npm install @ai-atlaas/pixel-foundry @base-ui/react
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add @ai-atlaas/pixel-foundry @base-ui/react
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @ai-atlaas/pixel-foundry @base-ui/react
```
{% endtab %}
{% endtabs %}

`@base-ui/react` is a peer dependency, so your app controls its version. You also need React 18 or 19.

## 2. Import the styles

Import the component stylesheet and **one** theme once, at the root of your app:

```tsx
import '@ai-atlaas/pixel-foundry/styles.css';
import '@ai-atlaas/pixel-foundry/themes/night-garden.css';
```

Available themes: `night-garden`, `parchment`, `pocket`, `arcade`, `ocean`.

## 3. Use a component

```tsx
import { useState } from 'react';
import { PixelButton, PixelModal, Icon } from '@ai-atlaas/pixel-foundry';

export function StartScreen() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PixelButton onClick={() => setOpen(true)}>
        <Icon name="plus" size={12} /> Press start
      </PixelButton>

      <PixelModal
        open={open}
        onOpenChange={setOpen}
        title="Ready for a new adventure?"
        description="Your progress stays with you."
      >
        <PixelButton onClick={() => setOpen(false)}>Let's go</PixelButton>
      </PixelModal>
    </>
  );
}
```

## 4. Turn on dark mode

Each theme file has both modes. Add the `dark` class to `<html>`:

```html
<html class="dark">
```

## Next steps

* [Installation](installation.md): framework-specific setup for Next.js and Vite.
* [Theming](theming.md): switch palettes, override tokens, theme at runtime.
* [Components](../components/README.md): every component and its props.
