---
description: Use Base UI directly and keep the Pixel Foundry look.
---

# Styling raw Base UI parts

Every wrapper is built from Base UI parts plus `px-*` classes. You can do the same when you need a different structure or a component without a wrapper. The stylesheet reacts to Base UI's state attributes (`data-checked`, `data-disabled`, `data-pressed`, `data-highlighted`, `data-popup-open`, …), so states work automatically.

## Class reference

| Base UI part | Class |
| --- | --- |
| `Button`, any trigger | `px-button` (+ `secondary`, `outline`, `ghost`; sizes `sm`, `lg`) |
| `Input`, `<input>`, `<textarea>` | `px-input` |
| Field label | `field-label` |
| `Select.Trigger` | `px-select` |
| `*.Positioner` (Select, Menu, Popover, Tooltip…) | `px-positioner` |
| `*.Popup` for lists (Select, Menu, Combobox) | `px-popup` |
| `*.Item` in lists | `px-menu-item` |
| `Dialog.Backdrop` | `px-backdrop` |
| `Dialog.Popup` | `px-dialog` |
| `Dialog.Title` / `Dialog.Description` | `pixel-title` / `dialog-desc` |
| `Tabs.List` / `Tabs.Tab` | `px-tab-list` / `px-tab` |
| `Accordion.Trigger` / `Accordion.Panel` | `px-accordion-trigger` / `px-accordion-panel` |
| `Progress.Track` / `Progress.Indicator` | `px-progress-track` / `px-progress-indicator` |
| `Slider.Control` / `Track` / `Indicator` / `Thumb` | `px-slider` / `px-track` / `px-indicator` / `px-thumb` |
| `Checkbox.Root` | `px-checkbox` |
| `Switch.Root` / `Switch.Thumb` | `px-switch` / `px-switch-thumb` |
| `Radio.Root` | `px-radio` |
| `Tooltip.Popup` | `px-tooltip` |
| `Toggle` | `px-toggle` |
| Icon-only button | `px-icon-control` |
| Badge `<span>` | `px-badge` (+ `success`, `warning`) |

## Tabs

{% @pixel-foundry/demo demo="tabs" %}

```tsx
import { Tabs } from '@base-ui/react/tabs';

<Tabs.Root defaultValue="inventory">
  <Tabs.List className="px-tab-list" aria-label="Character info">
    <Tabs.Tab className="px-tab" value="inventory">Inventory</Tabs.Tab>
    <Tabs.Tab className="px-tab" value="skills">Skills</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="inventory">Your equipment</Tabs.Panel>
  <Tabs.Panel value="skills">Your abilities</Tabs.Panel>
</Tabs.Root>
```

## Accordion

{% @pixel-foundry/demo demo="accordion" %}

```tsx
import { Accordion } from '@base-ui/react/accordion';

<Accordion.Root>
  <Accordion.Item value="details">
    <Accordion.Header>
      <Accordion.Trigger className="px-accordion-trigger">How does it work?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel className="px-accordion-panel">Base UI behavior. Your pixel theme.</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

## Menu

{% @pixel-foundry/demo demo="menu" %}

```tsx
import { Menu } from '@base-ui/react/menu';
import { Icon } from '@ai-atlaas/pixel-foundry';

<Menu.Root>
  <Menu.Trigger className="px-button secondary">
    Actions <Icon name="down" size={12} />
  </Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner className="px-positioner" sideOffset={6}>
      <Menu.Popup className="px-popup">
        <Menu.Item className="px-menu-item" onClick={save}>Save progress</Menu.Item>
        <Menu.Item className="px-menu-item" onClick={invite}>Invite a friend</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

## Progress

{% @pixel-foundry/demo demo="progress" %}

```tsx
import { Progress } from '@base-ui/react/progress';

<Progress.Root value={68}>
  <div className="slider-label">
    <Progress.Label>Experience</Progress.Label>
    <Progress.Value />
  </div>
  <Progress.Track className="px-progress-track">
    <Progress.Indicator className="px-progress-indicator" style={{ height: '100%' }} />
  </Progress.Track>
</Progress.Root>
```

{% hint style="warning" %}
Keep `style={{ height: '100%' }}` on the indicator. It makes the fill use the track's inner height, so it stays aligned at every border width.
{% endhint %}

## Tooltip

```tsx
import { Tooltip } from '@base-ui/react/tooltip';

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger className="px-button ghost">Hover me</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner className="px-positioner" sideOffset={8}>
        <Tooltip.Popup className="px-tooltip">Take breaks. Save often.</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

## Your own components

Use the tokens in your own CSS and your components will follow every palette and geometry setting:

```css
.my-card {
  background: var(--card);
  color: var(--card-foreground);
  border: var(--pixel) solid var(--border);
  box-shadow: var(--pixel-shadow) var(--pixel-shadow) 0 var(--shadow-color);
  border-radius: var(--radius); /* 0px: pixels are square */
}
```
